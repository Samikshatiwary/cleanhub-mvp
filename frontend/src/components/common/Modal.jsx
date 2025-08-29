import React, {useEffect} from "react";
import PropTypes from "prop-types";

const Modal = ({
    isOpen,
    onClose,
    title,
    children,
    size = "md",
    closeOnOverlayClick = true,
    className = "",
    ...props}) => {
        useEffect(() => {
            const handleEscape = (e) => {
                if(e.key === "Escape"){
                    onClose();
                }
            };
            if(isOpen){
                document.addEventListener("keydown", handleEscape);                
            }
            return () =>{
                document.removeEventListener("keydown", handleEscape);
            };
        }, [isOpen, onClose]);
        if(!isOpen) return null;
        const sizeClasses = {
            sm: "max-w-md",
            md: "max-w-xl",
            lg: "max-w-3xl",
            xl: "max-w-5xl",
            full: "max-w-full w-full"
        };

        return (
          <div className="fixed inset-0 z-50 overflow-y-auto">
  
             <div 
               className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                  onClick={closeOnOverlayClick ? onClose : null}/>
      
        
          <div className="flex items-center justify-center min-h-screen p-4 text-center">
             <div 
              className={`inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl 
               transform transition-all sm:my-8 sm:align-middle w-full ${sizeClasses[size]}${className}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-headline"
                {...props}
        >
        
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 
                className="text-lg leading-6 font-medium text-gray-900"
                id="modal-headline" >
                {title}
                </h3>
               <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500 focus:outline-none">
                <span className="sr-only">Close</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          
        <div className="px-4 py-5 sm:p-6">
            {children}
          </div>
          
        
         <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-200">
            <Button variant="primary" className="ml-2">Save</Button>
            <Button variant="secondary" onClick={onClose}>Cancel</Button>
          </div> 
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
   isOpen: PropTypes.bool.isRequired,
   onClose: PropTypes.func.isRequired,
   title: PropTypes.string.isRequired,
   children: PropTypes.node.isRequired,
   size: PropTypes.oneOf(["sm", "md", "lg", "xl", "full"]),
   closeOnOverlayClick: PropTypes.bool,
   className: PropTypes.string
};

export default Modal;
