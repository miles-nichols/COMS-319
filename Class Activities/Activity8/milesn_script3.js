const rectangle = {
    type: "rectangle",
    width: 5,
    height: 10,
    getWidth(){
        return this.width;
    },
    getHeight(){
        return this.height;
    },
    getArea(){
        return this.width * this.height;
    },
    setWidth(w){
        this.width = w;
    },
    setHeight(h){
        this.height = h;
    }
 };

const circle = {
    type: "circle",
    radius: 7,
    getRadius(){
        return this.radius;
    },
    getArea(){
        return Math.PI * this.radius * this.radius;
    },
    setRadius(r){
        this.radius = r;
    }
};

// prompt width and height (e.g., const w = prompt(“Enter width:”))
const w = prompt("Enter width:");
const h = prompt("Enter height:");
// set the values
rectangle.setWidth(w);
rectangle.setHeight(h);
// get the values
// Show the next message in console:
console.log('Width: ', rectangle.getWidth());
console.log('\nHeight: ', rectangle.getHeight());
console.log('\nThe area of square with Width ', rectangle.getWidth(), ' and Height ', rectangle.getHeight(), ' is ', rectangle.getArea());

const r = prompt("Enter radius:");
circle.setRadius(r);
console.log('\nRadius: ', circle.getRadius());
console.log('\nThe area of circle with Radius ', circle.getRadius(), ' is ', circle.getArea());

