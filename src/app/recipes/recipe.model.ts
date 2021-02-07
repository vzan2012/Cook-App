export class Recipe {
    // Older way 
    // public name: string;
    // public description: string;
    // public imagePath: string;

    // constructor(name: string, desc: string, imagePath: string) {
    //     this.name = name;
    //     this.description = desc;
    //     this.imagePath = imagePath
    // }

    // Another way 
    constructor(public name: string, public description: string, public imagePath: string) {
    }
}