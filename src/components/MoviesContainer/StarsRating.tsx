import {FC} from 'react';
import {Rating} from "react-simple-star-rating";

interface IProps {
    vote_average:number,
    size:number,
    color?:string
}

const StarsRating: FC<IProps> = ({vote_average,size,color}) => {

    return (
        <div>
            <Rating readonly={true} initialValue={vote_average/2} allowFraction={true} iconsCount={5} size={size} fillColor={color} emptyColor={'#726d6d'}/>
        </div>
    );
};

export {StarsRating};