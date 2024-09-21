/* Miles Nichols
* milesn@iastate.edu
*/ 20, 2024

/*
*
*Exercise 1
*/

console.log("Exercise 1");
console.log("-------------");

function maxOfTwo(n1, n2){
    let max = n1;
    if(n2 > max){
        max = n2;
    }
}

let n1 = 11;
let n2 = 10;
console.log(`The max between ${n1} and ${n2} is :`, maxOfTwo(n1,n2));


/*
*   
*Exercise 2
*/

console.log("Exercise 2");  
console.log("-------------");

function maxOfArray(array){
    let max = array[0];
    for(let i = 0; i < array.length; i++){
        if(array[i] > max){
            max = array[i];
        }
    }
    return max;
}

let array = [10,11,1024,125,9,201];
console.log(maxOfArray(array));

/*
*   
*Exercise 3
*/

console.log("Exercise 3");
console.log("-------------");


// Object :
const movie = {
    title : 'Some movie',
    releaseYear: 2018,
    rating: 4.5,
    director: 'Steven Spielberg'
    };

    function showProperties(movie){
        console.log('list of KEY names:');
        for(let value in movie){
           console.log(value);
        }

        console.log('\nlist of VALUE names:');
        for(let value in movie){
           console.log(movie[value]);
        }
    }

    showProperties(movie);

/*
*
*Exercise 4
*/

console.log("Exercise 4");
console.log("-------------");

const circle = {
    radius: 2,
    area : function(){
        return Math.PI * this.radius * this.radius;
    }
}


console.log(`The area of the circle is : ${circle.area().toFixed(2)}`);

/*
*
*Exercise 5
*/

console.log("Exercise 5");
console.log("-------------");

const circle2 = {
    radius: 2,
    area : function(){
        return Math.PI * this.radius * this.radius;
    },
    get radiusValue(){ 
        return this.radius;
    },
    set radiusValue(value){
        this.radius = value;
    }
}

console.log(`Area with ${circle2.radiusValue} :`,circle2.area());
circle2.radiusValue = 3;
console.log(`Area with ${circle2.radiusValue} :`,circle2.area());

/*
*
*Exercise 6
*/

console.log("Exercise 6");
console.log("-------------");

const circle3 = {
    radius: 2,
    area : function(){
        return Math.PI * this.radius * this.radius;
    },
    getRadiusValue(){ 
        return this.radius;
    },
    setRadiusValue(value){
        this.radius = value;
    },
}

console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());
circle3.setRadiusValue(3);
console.log(`Area with ${circle3.getRadiusValue()} :`,circle3.area());

/*
*
*Exercise 7
*/

console.log("Exercise 7");
console.log("-------------");

const calculateAverageGrade = function(grades){
    let total = 0;
    let count = 0;
    for(let subject in grades){
        console.log(subject);
        total += grades[subject];
        count++;
    }
    return total/count;
}

const grades = {
    math: 85,
    science: 90,
    history: 75,
    literature: 88
    };

console.log(calculateAverageGrade(grades));