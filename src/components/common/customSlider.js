import React from "react";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

const CustomSlider = ({ onChange, ThumbIcon, defaultAmount }) => {
    const CustomSliderMarkerLeft = (currentValue) => {
        return <>{ThumbIcon}</>;
    };

    return (
        <>
            <MultiSlider
                onValuesChange={(value) => onChange(value[0])}
                enabledTwo={false}
                step={1000}
                min={2000}
                max={100000}
                values={[defaultAmount]}
                isMarkersSeparated={true}
                customMarkerLeft={(e) => {
                    return <CustomSliderMarkerLeft currentValue={e.currentValue} />;
                }}
            />
        </>
    );
};

export default CustomSlider;
