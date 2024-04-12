import React, { useState, useEffect } from 'react';

const ModalComponent = ({ isOpen, onClose, coordinates, onFormSubmit, elementData }) => {
    const [formData, setFormData] = useState({
        ID: '',
        text: '',
        x: 0,
        y: 0,
        fontSize: '',
        fontWeight: ''
    });
    const [inputX, setInputX] = useState("");
    const [inputY, setInputY] = useState("");  

    console.log("The element data ID is :",elementData);
    // console.log("The element data X is  :",elementData.x);

    useEffect(() => {
        console.log("Element Data:", elementData);
        if (isOpen && elementData) {
            console.log("Setting FormData with elementData:", elementData);
            setFormData({
                ID: elementData.id || '',
                text: elementData.text || '',
                x: elementData.x,
                y: elementData.y,
                fontSize: elementData.fontSize || '',
                fontWeight: elementData.fontWeight || ''
            });
        } 
    }, [isOpen, elementData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // formData.x ? formData.x : coordinates.x
        
        if (name === "X") {
            setInputX(value);
        }
        if(name === "Y"){
            setInputY(value);
        }
        // console.log(inputX);

        console.log("X being set in handleINput Change");
        console.log("For ",name," the Value is :",value);
        setFormData({
          ...formData,
          [name]: value
        });
    };

    if (!isOpen) return null;

    const handleSubmit = () => {
        console.log("handlesubmit called");
        console.log("the form data is :",formData);
        onFormSubmit({
            ...formData,
            x: inputX ? inputX : formData.x ? formData.x : coordinates.x,
            y: inputY ? inputY : formData.y ? formData.y :coordinates.y
        });
        onClose(); // Call the passed onClose function to close the modal.
    };

    const handleClose = () => {
        onClose(); // Call the passed onClose function to close the modal.
    };

    return (
        <div style={{ position: 'fixed', top: '20%', left: '50%', transform: 'translate(-50%, -20%)', backgroundColor: 'white', padding: '20px', zIndex: 1000 }}>
            {/* <p>X Coordinate: {coordinates.x}</p>
            <p>Y Coordinate: {coordinates.y}</p> */}
            <form>
                <h1>Edit Label</h1>
                <button type="button" onClick={handleClose}>Close</button>
                <div>
                    <label htmlFor="text">Text:</label>
                    <input type="text" id="text" name="text" value={formData.text} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="X">X:</label>
                    <input type="text" id="X" name="X" value={inputX ? inputX : formData.x ? formData.x : coordinates.x} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="Y">Y:</label>
                    <input type="text" id="Y" name="Y" value={inputY ? inputY : formData.y ? formData.y : coordinates.y} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="fontSize">Font Size:</label>
                    <input type="text" id="fontSize" name="fontSize" value={formData.fontSize} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="fontWeight">Font Weight:</label>
                    <input type="text" id="fontWeight" name="fontWeight" value={formData.fontWeight} onChange={handleInputChange} />
                </div>
                <button type="button" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    );
};

export default ModalComponent;
