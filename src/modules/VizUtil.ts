import {
    BufferGeometry,
    Float32BufferAttribute
} from "svelthree";

function boxGeometry( width_, height_, depth_ )  {

     let width = width_ * 0.5;
     let height = height_ * 0.5;
     let depth = depth_ * 0.5;

    const geometry = new BufferGeometry();
    const position = [];

    position.push(
        - width, - height, - depth,
        - width, height, - depth,

        - width, height, - depth,
        width, height, - depth,

        width, height, - depth,
        width, - height, - depth,

        width, - height, - depth,
        - width, - height, - depth,

        - width, - height, depth,
        - width, height, depth,

        - width, height, depth,
        width, height, depth,

        width, height, depth,
        width, - height, depth,

        width, - height, depth,
        - width, - height, depth,

        - width, - height, - depth,
        - width, - height, depth,

        - width, height, - depth,
        - width, height, depth,

        width, height, - depth,
        width, height, depth,

        width, - height, - depth,
        width, - height, depth
     );

    geometry.setAttribute( 'position', new Float32BufferAttribute( position, 3 ) );

    return geometry;


}

export { boxGeometry };