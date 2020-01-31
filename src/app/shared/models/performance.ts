import { Specialty } from './specialty';
import { Show } from './show';
import { Artist } from './artist';

export class Performance {

    id: number;
    startTime: number;
    duration: number;
    show?: Show;
    specialty?: Specialty;
    artists?: Artist[];
}
