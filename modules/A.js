import { Assets } from './Assets.js';
import { GameObject } from './GameObject.js';

export class A {
    constructor() {
        this.result = new Promise((resolve, reject) => {
            this.win = resolve;
            this.lose = reject;
        });

        this.prompt = 'A is for ACID';
        this.subtitle = 'Create a diluted HCl (red) solution';

        const guy = new GameObject(Assets['guy'], 5, 0);
        const waterBeaker = new GameObject(
            Assets['beaker_water'],
            27,
            34,
            () => {
                this.lose(
                    "Don't even think of handling chemicals without goggles"
                );
            }
        );
        const acidBeaker = new GameObject(
            Assets['beaker_acid'],
            36,
            34,
            waterBeaker.onclick
        );
        const flask = new GameObject(Assets['flask_empty'], 48, 16);
        const goggles = new GameObject(Assets['goggles'], 45, 34, () => {
            goggles.x = 8;
            goggles.y = 25;
            goggles.clickable = false;

            acidBeaker.onclick = () => {
                this.lose(
                    'Mix acids with water to dilute them, not the other way around!'
                );
            };

            waterBeaker.onclick = () => {
                guy.img = Assets['guy_hold'];
                waterBeaker.x = 20;
                waterBeaker.y = 14;
                waterBeaker.clickable = false;

                acidBeaker.clickable = false;

                flask.clickable = true;
                flask.onclick = () => {
                    flask.img = Assets['flask_water'];

                    waterBeaker.img = Assets['beaker_empty'];
                    waterBeaker.x = 27;
                    waterBeaker.y = 34;

                    acidBeaker.clickable = true;
                    acidBeaker.onclick = () => {
                        acidBeaker.x = 20;
                        acidBeaker.y = 14;

                        flask.onclick = () => {
                            acidBeaker.img = Assets['beaker_empty'];
                            this.win(
                                'Correct. Always add water into the solution first!'
                            );
                            return true;
                        };

                        return true;
                    };

                    return true;
                };

                return true;
            };

            return true;
        });

        this.objects = [
            guy,
            waterBeaker,
            acidBeaker,
            flask,
            goggles,
            new GameObject(Assets['table'], 45, 0),
            new GameObject(Assets['shelf'], 25, 32),
        ];
    }
}
