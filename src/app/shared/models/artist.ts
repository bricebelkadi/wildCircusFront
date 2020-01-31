import { Specialty } from './specialty';
import { Performance } from './performance';

export class Artist {
    id: number;
    firstname: string;
    lastname: string;
    artistName: string;
    specialty?: Specialty;
    performances?: Performance[];
}
