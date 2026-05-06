import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { catchError, map, of, switchMap, forkJoin, Observable } from 'rxjs';

@Component({
    selector: 'app-music-search',
    standalone: true,
    templateUrl: './MusicSearch.component.html',
    imports: [FormsModule, CommonModule, HttpClientModule],
})
export class MusicSearchComponent implements OnInit {
    searchTerm: string = 'Imagine Dragons';
    tracks: FullTrack[] = []
    loading = false;
    error: string | null = null;
    API_BASE = 'https://itunes.apple.com/';
    private currentAudio: HTMLAudioElement | null = null;
    private currentPreviewUrl: string | null = null;
    constructor(private http: HttpClient, private cd: ChangeDetectorRef) { }

    ngOnInit(): void { this.searchTracks(this.searchTerm); }
    searchTracks(name: string): void {
        const q = (name || '').trim();
        if (!q) { this.tracks = []; return; }
        this.loading = true;
        this.error = null;

        this.http.get<any>(`https://itunes.apple.com/search?term=${encodeURIComponent(q)}&entity=song&limit=20`)
            .pipe(
                switchMap((res: any): Observable<FullTrack[]> => {
                    const tracks = res?.results || [];
                    if (tracks.length) { return of(tracks.map((t: any) => this.transformTrack(t))); }
                    return this.http.get<any>(`${this.API_BASE}filter.php?i=${encodeURIComponent(q)}`)
                        .pipe(
                            switchMap((fres: any): Observable<FullTrack[]> => {
                                const filtered = fres?.meals || [];
                                if (!filtered.length) return of([]);
                                const ids = filtered.slice(0, 8).map((m: any) => m.idMeal);
                                const lookups: Observable<any | null>[] = ids.map((id: string) =>
                                    this.http.get<any>(`${this.API_BASE}lookup.php?i=${id}`).pipe(map(lr => (lr?.meals && lr.meals[0]) || null), catchError(() => of(null)))
                                );
                                return forkJoin(lookups).pipe(
                                    map((results: (any | null)[]) => results.filter(Boolean).map((m: any) => this.transformTrack(m)))
                                );
                            })
                        );
                }),
                catchError(err => { this.error = 'Failed to load tracks'; return of([]); })
            )
            .subscribe((list: FullTrack[]) => {
                this.tracks = list;
                this.loading = false;
                this.cd.detectChanges();
            });
    }

    onSearch(): void { this.searchTracks(this.searchTerm); }

    onPlay(track: FullTrack): void {
        const audio = new Audio(track.previewUrl);
        audio.play();
    }

    // Called from the template: play/pause a preview URL. Ensures previews don't overlap.
    playPreview(previewUrl?: string): void {
        if (!previewUrl) return;

        // If clicking the same preview that's currently loaded, toggle play/pause
        if (this.currentAudio && this.currentPreviewUrl === previewUrl) {
            if (this.currentAudio.paused) {
                this.currentAudio.play().catch(() => { /* ignore play failures */ });
            } else {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }
            return;
        }

        // Stop any currently playing preview
        if (this.currentAudio) {
            try { this.currentAudio.pause(); } catch { }
            try { this.currentAudio.currentTime = 0; } catch { }
        }

        // Start the new preview
        this.currentAudio = new Audio(previewUrl);
        this.currentPreviewUrl = previewUrl;
        this.currentAudio.play().catch(() => { /* ignore play failures */ });
        this.currentAudio.onended = () => {
            this.currentAudio = null;
            this.currentPreviewUrl = null;
        };
    }

        // Called from the template: play/pause a preview URL. Ensures previews don't overlap.
    playTrack(trackUrl?: string): void {
        if (!trackUrl) return;

        // If clicking the same preview that's currently loaded, toggle play/pause
        if (this.currentAudio && this.currentPreviewUrl === trackUrl) {
            if (this.currentAudio.paused) {
                this.currentAudio.play().catch(() => { /* ignore play failures */ });
            } else {
                this.currentAudio.pause();
                this.currentAudio.currentTime = 0;
            }
            return;
        }

        // Stop any currently playing preview
        if (this.currentAudio) {
            try { this.currentAudio.pause(); } catch { }
            try { this.currentAudio.currentTime = 0; } catch { }
        }

        // Start the new preview
        this.currentAudio = new Audio(trackUrl);
        this.currentPreviewUrl = trackUrl;
        this.currentAudio.play().catch(() => { /* ignore play failures */ });
        this.currentAudio.onended = () => {
            this.currentAudio = null;
            this.currentPreviewUrl = null;
        };
    }

    // Format milliseconds into M:SS (fallback when missing)
    formatDuration(ms?: number | null): string {
        if (!ms || typeof ms !== 'number' || isNaN(ms)) return '--:--';
        const totalSec = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSec / 60);
        const seconds = totalSec % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    private transformTrack(t: any): FullTrack {
        return {
            trackId: t.trackId,
            trackName: t.trackName,
            trackCensoredName: t.trackCensoredName,
            artistId: t.artistId,
            artistName: t.artistName,
            artistViewUrl: t.artistViewUrl,
            collectionId: t.collectionId,
            collectionName: t.collectionName,
            collectionViewUrl: t.collectionViewUrl,
            artworkUrl30: t.artworkUrl30,
            artworkUrl60: t.artworkUrl60,
            artworkUrl100: t.artworkUrl100,
            previewUrl: t.previewUrl,
            trackViewUrl: t.trackViewUrl,
            trackTimeMillis: t.trackTimeMillis,
            trackNumber: t.trackNumber,
            discNumber: t.discNumber,
            releaseDate: t.releaseDate,
            primaryGenreName: t.primaryGenreName,
            trackExplicitness: t.trackExplicitness,
            isStreamable: t.isStreamable,
            country: t.country,
            currency: t.currency,
            trackPrice: t.trackPrice,
        };
    }
}

interface FullTrack {
    trackId: number;
    trackName: string;
    trackCensoredName?: string;
    artistId?: number;
    artistName: string;
    artistViewUrl?: string;
    collectionId?: number;
    collectionName?: string;
    collectionViewUrl?: string;
    artworkUrl30?: string;
    artworkUrl60?: string;
    artworkUrl100?: string;
    previewUrl?: string;
    trackViewUrl?: string;
    trackTimeMillis?: number;
    trackNumber?: number;
    discNumber?: number;
    releaseDate?: string;
    primaryGenreName?: string;
    trackExplicitness?: string;
    isStreamable?: boolean;
    country?: string;
    currency?: string;
    trackPrice?: number;
}