interface basic {
    "name": string;
    "key": string;
}

interface feartures {
    "key": string;
    "name": string;
    "desc": string;
    "feature_type": string;
    "gained_at": gainedAt[];
    "data_for_class_table": dataForClassTable[];
}

interface document {
    "name": string;
    "key": string
    "type": string;
    "display_name": string;
    "publisher": basic;
    "gamesystem": basic;
    "permalink": string;
};

interface classBenfits {
    "name": string;
    "desc": string;
    "type": string;
}

export interface ClassInfo {
    "key": string;
    "features": feartures[];
    "hit_points": hitPoints;
    "document": document;
    "saving_throws": savingThrows[];
    "subclass_of": null | string;
    "name": string;
    "desc": string;
    "hit_dice": string;
    "caster_type": string;
    "primary_abilities": any[]
}

interface raceTraits {
    "name": string;
    "desc": string;
    "type": string | null;
    "order": number;
}

export interface RaceInfo {
    "key": string;
    "is_subspecies": false;
    "document": document;
    "traits": raceTraits[];
    "name": string;
    "desc": string;
    "subspecies_of": null
}

interface gainedAt {
    "level": number;
    "detail": string | null;
}

interface dataForClassTable {
    "level": number;
    "column_value": string;
}

interface hitPoints {
    "hit_dice": string;
    "hit_dice_name": string;
    "hit_points_at_1st_level": string;
    "hit_points_at_higher_levels": string;
}

interface savingThrows {
    "name": string;
}

export interface BackgroundInfo {
    "key": string;
    "name": string;
    "desc": string;
    "document": document;
    "benefits": classBenfits[];
}