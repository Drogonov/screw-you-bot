import { Injectable } from '@nestjs/common';

@Injectable()
export class ScrewYouService {
    // Private properties for phrases
    private _startPhrases: string[] = [
        'Эй ты,',
        'Слушай, другалик,',
        'Посмотри сюда, витязь,',
        'Слышь, шутник,',
        'Эй, ты умник,',
        'Ну ты и нашкодил,',
        'Ну ты и натворил чудес,',
        'Ой, брось,',
        'Послушай-ка, герой,',
        'Ну вот, снова ты,'
    ];

    private _midPhrases: string[] = [
        'ты такой комичный,',
        'от тебя смеюсь,',
        'вот это фокусник,',
        'где такому учат,',
        'да ты смехота,',
        'ну ты загнул,',
        'да ты настоящий архаровец,',
        'что за шутник,',
        'как ты до этого додумался,',
        'веселишь народ,'
    ];

    private _endPhrases: string[] = [
        'иди-ка в сказку приключений!',
        'двинь в лес чудес!',
        'подайся к горизонту!',
        'задвигай далеко-далеко!',
        'закатайся в мечты!',
        'направляйся в царство грёз!',
        'унесись по волнам!',
        'спустись с небес на землю!',
        'возвращайся с ясным разумом!',
        'плыви по течению!'
    ];

    // Generates a random message using pre-defined phrases
    generateRandomMessage(): string {
        const start = this._randomElement(this._startPhrases);
        const mid = this._randomElement(this._midPhrases);
        const end = this._randomElement(this._endPhrases);

        return `${start} ${mid} ${end}`;
    }

    // Helper method to get a random element from an array
    private _randomElement(elements: string[]): string {
        return elements[Math.floor(Math.random() * elements.length)];
    }
}