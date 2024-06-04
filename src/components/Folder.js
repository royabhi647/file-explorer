import React, { useState } from 'react'
import FolderIcon from "../assets/folder_icon.png";
import FolderAdd from "../assets/folder-add-icon.png";
import FileAdd from "../assets/file-add-icon.png";

function Folder({ explorer, handleInsertNode }) {
   const [expand, setExpand] = useState(false);
   const [showInput, setShowInput] = useState({
      visible: false,
      isFolder: null
   });

   // handles the new folder on Add icon
   const handleNewFolder = (e, isFolder) => {
      e.stopPropagation();
      setExpand(true);

      setShowInput({
         visible: true,
         isFolder
      })
   }

   // Insert new Folder on Folder Add btn Input box
   const onAddFolder = (e) => {
      if (e.keyCode === 13 && e.target.value) {
         handleInsertNode(explorer.id, e.target.value, showInput.isFolder);
         setShowInput({ ...showInput, visible: false })
      }
   }


   // Show Parent Folder and Nested Folder
   if (explorer.isFolder) {
      return (
         <div style={{ marginTop: "5px" }}>
            <div className='folder' onClick={() => setExpand(!expand)}>
               <div>
                  <img src={FolderIcon} alt='' />
                  {explorer.name}
               </div>
               <div>
                  <button onClick={(e) => handleNewFolder(e, false)}>
                     <img src={FileAdd} alt='' />
                  </button>
                  <button onClick={(e) => handleNewFolder(e, true)}>
                     <img src={FolderAdd} alt='' />
                  </button>
               </div>
            </div>

            {
               showInput.visible && (
                  <div className='inputContainer'>
                     <div>{showInput.isFolder ? <img src={FolderIcon} alt='' /> : "📄"}</div>
                     <input
                        type='text'
                        autoFocus
                        onKeyDown={onAddFolder}
                        onBlur={() => setShowInput({ ...showInput, visible: false })}
                        className='inputContainer__input'
                     />
                  </div>
               )
            }


            <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
               {
                  explorer.items.map((exp) => {
                     return (
                        <Folder
                           explorer={exp}
                           handleInsertNode={handleInsertNode}
                           key={exp.id}
                        />
                     )
                  })
               }
            </div>
         </div>
      )
   }

   // Show File 
   else {
      return (
         <span className='file'>📄 {explorer.name}</span>
      )
   }
}

export default Folder;