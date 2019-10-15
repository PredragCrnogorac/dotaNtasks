import { map } from 'rxjs/operators';
export class Hero {
    name: string;
    image_list: string;
    image_full: string;
    image_details: string;
    spells: { name: string, description: string, image: string }[];
    min_dmg;
    max_dmg;
    roles: string[];
    stats: { base: number, gain: number }[];
    video: string;
    battlestats: any;
    armor: number;
    mov_speed: number;

}
