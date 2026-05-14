import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Open5eService, Open5eClass, Open5eList } from '../../services/open5e.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { faShield } from '@fortawesome/free-solid-svg-icons';
interface Character {
    name: string;
    level: number;
    class: Open5eClass;
    race: Open5eClass;
    background: Open5eClass;
    ac: number;
    speed: number;
    strength: string;
    dexterity: string;
    constitution: string;
    intelligence: string;
    wisdom: string;
    charisma: string;
}
@Component({
    selector: 'app-dnd-character-generator',
    standalone: true,
    imports: [FormsModule, CommonModule, FontAwesomeModule],
    templateUrl: './DndCharacterGenerator.component.html',
    styleUrl: '../../../styles.css'
})

export class DndCharacterGenerator {
    // Predefined names
    private readonly names: { [key: string]: string[] } = {
        "goblin": ["Moss Bogclaw", "Spog Muckfinger", "Flek Snapclaw", "Griddle Spitmonger", "Quiz Snotbelly"],
        "orc": ["Zulnala gra-Krashari", "Druk gro-Zulgar", "Kraznari gra-Drakari", "Moktar gro-Dromkar", "Volnar gro-Brakkar"],
        "elf": ["Brilella", "Ollivette", "Borrflin", "Merrinelle", "Ivira"],
        "human": ["Aric Stormrider", "Lia Moonshadow", "Dorian Blackwood", "Seraphina Brightblade", "Kael Fireheart"],
        "dwarf": ["Lorrim Deepstrike", "Larthor Frostbeard", "Grum Runeblade", "Bruk Greybeard", "Mordrin Ironspike"],
        "halfling": ["Rilla Stoutfoot", "Quinlan Shimmerstone", "Pyn Chubbledash", "Dally Bristleroot", "Om Goldentree"],
        "dragonborn": ["Tharivol Flameheart", "Zarathustra Emberclaw", "Kaelen Drakescale", "Vexis Stormbreath", "Drakara Ironhide"],
        "gnome": ["Fizzlebottom", "Nimblewhistle", "Pip Sprocketgear", "Tink Brightspark", "Glimmerwick"],
        "tiefling": ["Zariel Shadowflame", "Lilith Nightshade", "Azazel Darkfire", "Morrigan Hellborn", "Vex Shadowthorn"],
        "half-elf": ["Elysia Moonwhisper", "Kaelen Starfall", "Lyralei Sunwhisper", "Theron Moonshadow", "Sylas Starweaver"],
        "Half-Orc": ["Grommash Hellscream", "Durotan Frostwolf", "Garrosh Hellscream", "Thrall Doomhammer", "Orgrim Doomhammer"]
    };
    // State management using signals
    classes = signal<Open5eClass[] | null>(null);
    races = signal<Open5eClass[] | null>(null);
    backgrounds = signal<Open5eClass[] | null>(null);
    loading = signal(false);
    error = signal('');
    // Observables for random selections
    public randomedClass: Observable<Open5eClass> | null = null;
    public randomedRace: Observable<Open5eClass> | null = null;
    public randomedBackground: Observable<Open5eClass> | null = null;
    public character: Character | null = null;
    public faShield = faShield;
    constructor(private open5e: Open5eService) {
        // Fetch classes, races, and backgrounds from Open5e API
        this.open5e.getClasses().subscribe({
            next: (response: Open5eList<Open5eClass>) => {
                const mainClasses = response.results.filter((c: Open5eClass) => c.subclass_of === null && c.key?.includes('srd'));
                this.classes.set(mainClasses);
                this.loading.set(false);
            },
            error: (error: any) => {
                this.error.set(error.message);
                this.loading.set(false);
            }
        });

        this.open5e.getRaces().subscribe({
            next: (response: Open5eList<Open5eClass>) => {
                const mainRaces = response.results.filter((race: Open5eClass) => race.subspecies_of === null && race.key?.includes('srd')); // Filter out subspecies and only include SR
                this.races.set(mainRaces);
                this.loading.set(false);
            },
            error: (error: any) => {
                this.error.set(error.message);
                this.loading.set(false);
            }
        });

        this.open5e.getBackgrounds().subscribe({
            next: (response: Open5eList<Open5eClass>) => {
                const mainBackgrounds = response.results.filter((bg: Open5eClass) => bg.key?.includes('srd')); // Only include SRD backgrounds
                this.backgrounds.set(mainBackgrounds);
                this.loading.set(false);
            },
            error: (error: any) => {
                this.error.set(error.message);
                this.loading.set(false);
            }
        });
    }
    // Function to generate ability scores using standard array and apply modifiers
    standardArrayFunction(): number {
        return Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1 + Math.floor(Math.random() * 6) + 1;
    }
    strArrWithModifier(): string {
        const str = this.standardArrayFunction();
        const modifier = Math.floor((str - 10) / 2);
        return `${str} (${modifier >= 0 ? '+' : ''}${modifier})`;
    }
    // Function to generate a random character
    generateCharacter(): void {
        // Randomly select class, race, background, and alignment
        const randomedClass = this.classes()?.[Math.floor(Math.random() * (this.classes()?.length || 0))] || null;
        const randomedRace = this.races()?.[Math.floor(Math.random() * (this.races()?.length || 0))] || null;
        const randomedBackground = this.backgrounds()?.[Math.floor(Math.random() * (this.backgrounds()?.length || 0))] || null;
        // Generate ability scores using standard array and apply modifiers
        const strArray = { str: this.strArrWithModifier(), dex: this.strArrWithModifier(), con: this.strArrWithModifier(), int: this.strArrWithModifier(), wis: this.strArrWithModifier(), cha: this.strArrWithModifier() }
        //name generation
        const race = randomedRace?.name.toLowerCase() || 'human';
        const randomNameList = this.names[race] || this.names['human'];
        const randomName = randomNameList[Math.floor(Math.random() * randomNameList.length)];
        console.log("Randomed Class", randomedClass);
        console.log("Randomed Race", randomedRace);
        console.log("Randomed Background", randomedBackground);
        if (randomedClass && randomedRace && randomedBackground) {
            this.character = {
                name: randomName,
                level: 1,
                class: randomedClass,
                race: randomedRace,
                background: randomedBackground,
                ac: 10 + parseInt(strArray.dex),
                speed: 30,
                strength: strArray.str,
                dexterity: strArray.dex,
                constitution: strArray.con,
                intelligence: strArray.int,
                wisdom: strArray.wis,
                charisma: strArray.cha
            };
        }
    }
}