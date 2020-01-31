import { Circus } from './circus';
import { Performance } from './performance';

export class Show {

    id: number;
    title: string;
    circus?: Circus;
    performances?: Performance[];
}

