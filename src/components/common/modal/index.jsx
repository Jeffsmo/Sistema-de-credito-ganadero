import ReactDOM from "react-dom";


import { useContext } from 'react'
import { GmodalContext } from '../../../global/contexts/context'


import "./styles/styles.css";


function Modal({children}){
    
    const contextGmodal = useContext(GmodalContext)
    //Declaraciones de contexto aquí ^^

    //const isOpen = costContext.isModalOpen || saleContext.isModalOpen || recordCostContext.isModalOpen || recordSaleContext.isModalOpen;

    const isOpen = contextGmodal.isGmodalOpen
    
    return ReactDOM.createPortal(
        <div className={`${isOpen ? 'modal-container' : 'hidden'}`}>
            <div className='modal-container'>
                <div className='modal-card'>
                        <div className='modal-options'>
                        {/* {isOpen ? <h2>{costContext.isModalOpen ? 'Gastos' : (saleContext.isModalOpen ? 'Ventas' : (recordCostContext.isModalOpen ? 'Registro de Gastos' :(recordSaleContext.isModalOpen ? 'Registro de Ventas': null)))}</h2> : null}
                            < className='close-icon' onClick={()=>{
                                costContext.closeModal();
                                costContext.closeCreateModal();
                                costContext.closeDeleteModal();
                                saleContext.closeModal();
                                saleContext.closeCreateModal();
                                saleContext.closeDeleteModal();
                                recordCostContext.closeModal();
                                recordCostContext.closeCreateModal();
                                recordCostContext.closeDeleteModal();
                                recordSaleContext.closeModal();
                                recordSaleContext.closeCreateModal();
                                recordSaleContext.closeDeleteModal();
                                }}/> */}
                        </div>
                        {children}
                </div> 
            </div>
        </div>, document.getElementById('modal'))
}

export {Modal}
