import React, { useEffect, useState } from 'react';
import './HomePage.css';
import SideBar from './components/SideBar/SideBar';
import ModalComponent from './components/Modal/ModalComponent';

const HomePage = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [pageBarContent, setPageBarContent] = useState([]);
    const [tempContent, setTempContent] = useState(""); // Temporarily store the content before modal approval
    const [selectedElementData, setSelectedElementData] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const content = e.dataTransfer.getData('content');
        setCoordinates({ x: e.clientX, y: e.clientY });
        setTempContent(content); // Store dropped content temporarily
        setModalOpen(true);
    };

    const handleFormSubmit = (formData) => {
        // Add the form data to pageBarContent
        console.log('Form Data received at Home Page formSubmit:', formData);
        console.log('pageBarContent:', pageBarContent);
        const newContent = {
            ID: formData.ID ? formData.ID : pageBarContent.length,
            text: formData.text,
            x: formData.x,
            y: formData.y,
            fontSize: formData.fontSize,
            fontWeight: formData.fontWeight,
            type: tempContent
        };
        // console.log(newContent);
        // console.log('pageBarContent:', pageBarContent);
        // const result = pageBarContent.map((content, index) => index === newContent.ID);
        // console.log("Result is :",result);
        setPageBarContent(prevContent => [...prevContent, newContent]);
    };

    const handleSelect = (ID) => {
        const index = parseInt(ID.match(/\d+$/)[0], 10); // Extract the numeric part at the end of the ID
        // const index = ID.split('-')[1];
        const elementData = pageBarContent[index];
        console.log("Element selected at handlSelect:", elementData);
        
            setSelectedElementData({
                ...elementData,
                id: ID
            });
        const element = document.getElementById(ID); // Get the label element by its ID

        if (element) {
            element.style.border = "2px solid red";
            element.style.padding = "5px";
            element.style.cursor = "pointer";
        }
    

        document.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
              // Enter key was pressed
              setModalOpen(true);
              console.log("Enter key pressed");
              // Add your logic here...
            }
        });
    }

    useEffect(() => {
        // console.log("Tempcontent:",tempContent);
        // console.log('pageBarContent:', pageBarContent);
    }, [pageBarContent,tempContent]);

    const handleDragOver = (e) => {
        e.preventDefault(); // Necessary for allowing the drop
    };

    const closeModal = () => {
        setModalOpen(false);
    };


    return (
        <div className="container">
            <ModalComponent isOpen={modalOpen} onClose={closeModal} coordinates={coordinates} onFormSubmit={handleFormSubmit} elementData={selectedElementData} />
            <div className="pagebar" onDrop={handleDrop} onDragOver={handleDragOver}>
                {pageBarContent.map((content, index) => {
                    const commonStyles = {
                        position: 'absolute', 
                        left: content.x, 
                        top: content.y, 
                        fontSize: content.fontSize, 
                        fontWeight: content.fontWeight
                      };
                    
                      if (content.type === 'Label') {
                        // console.log("label dropped");
                        // Render a label element
                        return (
                          <label key={index} id={`label-${index}`} style={commonStyles} onClick={() => handleSelect(`label-${index}`)}>
                            {content.text} 
                          </label>
                        );
                      } else if (content.type === 'Button') {
                        // console.log("button dropped");
                        // Render a button element
                        return (
                          <button key={index} id={`button-${index}`} style={commonStyles} onClick={() => handleSelect(`button-${index}`)}>
                            {content.text} 
                          </button>
                        );
                      } else if (content.type === 'Input') {
                        // console.log("input dropped");
                        // Render a button element
                        return (
                          <input key={index} id={`input-${index}`} style={commonStyles} placeholder={content.text} onClick={() => handleSelect(`input-${index}`)}  >
                            {/* {content.text} Assuming 'value' is the button text */}
                          </input>
                        );
                      } 
                      else {
                        console.log("undefined dropped");
                        // Fallback rendering or for other types of content
                        return (
                          <div key={index} className="dropped-content" style={commonStyles}>
                            {content.value || content.text} {/* Display either 'value' or fallback to 'text' if 'value' is not provided */}
                          </div>
                        );
                      }
                })}
            </div>
            <div className="sidebar">
                <SideBar />
            </div>
        </div>
    );
};

export default HomePage;
