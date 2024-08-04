//import ReactDOM from "react-dom";
//import { XMarkIcon } from '@heroicons/react/24/solid';
import "./styles.css";
import { useContext, useState} from 'react';
import { CostsContext, CostsHistorialContext,  SalesHistorialContext, MenuContext, SalesContext,  RecordCostContext, RecordSaleContext } from '../../../context';
import {useForm} from 'react-hook-form';


function ModalCreateCost() {
    const { register, handleSubmit, formState : {errors} } = useForm();


    const costContext = useContext(CostsContext);
    const recordContext = useContext(RecordCostContext);

    
    const onSubmit = handleSubmit((data) => {
        // Verificar si hay una fecha y realizar la división
        if (data.Fecha) {
            const [year, month, day] = data.Fecha.split('-');
            // Agregar las partes de la fecha al objeto data
            data.year = ~~year;
            data.month = ~~month;
            data.day = ~~day;
            delete data.Fecha
        }
        
        if(data.precio){
            data.precio = ~~ data.precio
        }
        
        data.recordCostId = recordContext.selectedRecord[0].id

        
        costContext.setFormData(data);
        
        
    });

    return (
        <div className={`${costContext.isModalCreateOpen ? 'modal-create-container' : 'hidden'}`}>
            <div className='modal-create-card'>
                <div className='modal-create-options'>
                    <h2>Registrar nuevo gasto</h2>
                </div>
                <div>
                    <form className="create-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}
                        <label htmlFor="product" className='register-product-name'>
                            Producto
                        </label>
                        <input
                            type="text"
                            className="cost-input"
                            {...register("product", {
                                required:{
                                    value: true,
                                    message: "Nombre requerido"
                                },
                                maxLength: {
                                    value:250,
                                    message: "Nombre debe tener máximo 250 caracteres"
                                },
                                minLength:{
                                    value:4,
                                    message: "Nombre debe tener mínimo 4 caracteres"
                                }
                            })}
                        />
                        {
                            errors.product?.message  && <span className="error">{errors.product?.message}</span>
                        }
                        

                        <label htmlFor="description" className='register-product-name'>
                            Descripción
                        </label>
                        <textarea
                            type="text"
                            className="cost-input-description"
                            {...register("description")}
                        />
                        <label htmlFor="week">
                            Semana
                        </label>
                        <input
                            type="week"
                            className="cost-input"
                            disabled
                            value={recordContext.selectedRecord[0]?.week}
                        />

                        {
                            errors.week?.message && <span className="error">{errors.week?.message}</span>
                        }

                        <label htmlFor="value">
                            Precio
                        </label>
                        <input
                            type="number"
                            className="cost-input"
                            id=""
                            {...register("value", {
                                required:{
                                    value:true,
                                    message:"Precio requerido"
                                },
                                min:{
                                    value: 1000,
                                    message: "El valor mínimo para facturar es $1000 COP"
                                }

                            })}
                        />
                        {
                            errors.value?.message && <span className="error">{errors.value?.message}</span>
                        }

                        <label htmlFor="Fecha">
                            Fecha
                        </label>
                        <input
                            type="date"
                            className="cost-input"
                            {...register("Fecha", {
                                required: {
                                    value:true,
                                    message: "Fecha requerida"
                                },
                            })}
                        />

{
                            errors.Fecha?.message && <span className="error">{errors.Fecha?.message}</span>
                        }

                        <div className="save-cost-container">
                            <button className="save-cost" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ModalCreateSale() {

    const { register, handleSubmit, formState : {errors} } = useForm();
    const saleContext = useContext(SalesContext);
    const menuContext = useContext(MenuContext);
    const recordContext = useContext(RecordSaleContext);

    // Estado para almacenar el precio seleccionado
    const [selectedPrice, setSelectedPrice] = useState(0);

    const handleSelectChange = (event) => {
        // Obtener el precio de la opción seleccionada
        const selectedOption = menuContext.items.find(item => item.id === parseInt(event.target.value));
        setSelectedPrice(selectedOption ? selectedOption.price : 0);
    };

    const onSubmit = handleSubmit((data) => {
        // Verificar si hay una fecha y realizar la división

        if (data.Fecha) {
            const [year, month, day] = data.Fecha.split('-');
            // Agregar las partes de la fecha al objeto data
            data.year = ~~year;
            data.month = ~~month;
            data.day = ~~day;
            delete data.Fecha
        }
        
        if(data.precio){
            data.boardId = ~~ data.boardId
        }
        if(data.menuId){
            data.menuId = ~~ data.menuId
        }
        
        data.recordSaleId = recordContext.selectedRecord[0].id
        
        saleContext.setFormData(data);
        
        
    });

    return (
        <div className={`${saleContext.isModalCreateOpen ? 'modal-create-container' : 'hidden'}`}>
            <div className='modal-create-card'>
                <div className='modal-create-options'>
                    <h2>Registrar nueva venta</h2>
                </div>
                <div>
                    <form className="create-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}

                        <label htmlFor="boardId">
                            Mesa
                        </label>
                        <input
                            type="number"
                            className="board-input"
                            id=""
                            {...register("boardId", {
                                required:{
                                    value:true,
                                    message:"Número de mesa requerido"
                                },
                                min:{
                                    value: 1,
                                    message: "El número de mesa debe ser mayor a cero"
                                },
                                max:{
                                    value:100,
                                    message: "El número de mesa no debes ser mayor a 100"
                                }

                            })}
                        />

                            {
                                errors.boardId?.message && <span className="error">{errors.boardId?.message}</span>
                            }
                        <label htmlFor="menuId" className='register-product-name'>
                            Producto
                        </label>

                        <select name="menu" 
                        className="select-menu-items" 
                        {...register('menuId',
                        {
                            required:{
                                value: true,
                                message: "Debe Seleccionar un Producto"
                            }
                        })}
                        
                        onChange={handleSelectChange}
                        >
                            <option>{null}</option>
                        {menuContext.items.map((item)=>
                            <option
                            className="select-menu-options" 
                            value={item.id} 
                            key={item.id}>{item.name}</option>
                            )}
                        </select>
                        {
                            errors.product?.message  && <span className="error">{errors.product?.message}</span>
                        }

                        <label htmlFor="sale" className='register-product-name'>
                            Descripción
                        </label>
                        <textarea
                            type="text"
                            className="cost-input-description"
                            {...register("sale")}
                        />


                        <label htmlFor="value">
                            Precio
                        </label>
                        <input
                            type="number"
                            className="cost-input"
                            id=""
                            disabled
                            value={selectedPrice}
                        />
                        {
                            errors.value?.message && <span className="error">{errors.value?.message}</span>
                        }

                        <label htmlFor="Fecha">
                            Fecha
                        </label>
                        <input
                            type="date"
                            className="cost-input"
                            {...register("Fecha", {
                                required: {
                                    value:true,
                                    message: "Fecha requerida"
                                },
                            })}
                        />

{
                            errors.Fecha?.message && <span className="error">{errors.Fecha?.message}</span>
                        }

                        <div className="save-cost-container">
                            <button className="save-cost" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



function ModalCreateRecordCosts() {

    const { register, handleSubmit, formState : {errors} } = useForm();
    const costHistorialContext = useContext(CostsHistorialContext);

    const onSubmit = handleSubmit((data) => {
        // Verificar si hay una fecha y realizar la división

        console.log(data)
        if (data.Fecha) {
            const [year, month, day] = data.Fecha.split('-');
            // Agregar las partes de la fecha al objeto data
            data.year = ~~year;
            data.month = ~~month;
            data.day = ~~day;
            delete data.Fecha
        }
        
        if(data.precio){
            data.boardId = ~~ data.boardId
        }
        if(data.menuId){
            data.menuId = ~~ data.menuId
        }
        console.log(data)
        
        costHistorialContext.setFormData(data);
        
        
    });

    return (
        <div className={`${costHistorialContext.isModalCreateOpen ? 'modal-create-container' : 'hidden'}`}>
            <div className='modal-create-card'>
                <div className='modal-create-options'>
                    <h2>Nuevo Registro de Gastos</h2>
                </div>
                <div>
                    <form className="create-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}



                        <label htmlFor="week" className='register-product-name'>
                            Semana
                        </label>
                        <input
                            type="week"
                            className="cost-input"
                            {...register("week",{
                                required:{
                                    value:true,
                                    message:"Semana Requerida"
                                }
                            })}
                        />
                        {
                            errors.week?.message && <span className="error">{errors.week?.message}</span>
                        }


                        <div className="save-cost-container">
                            <button className="save-cost" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}


function ModalCreateRecordSales() {


    const { register, handleSubmit, formState : {errors} } = useForm();
    const saleHistorialContext = useContext(SalesHistorialContext);

    const onSubmit = handleSubmit((data) => {
        // Verificar si hay una fecha y realizar la división

        console.log(data)
        if (data.Fecha) {
            const [year, month, day] = data.Fecha.split('-');
            // Agregar las partes de la fecha al objeto data
            data.year = ~~year;
            data.month = ~~month;
            data.day = ~~day;
            delete data.Fecha
        }
        
        if(data.precio){
            data.boardId = ~~ data.boardId
        }
        if(data.menuId){
            data.menuId = ~~ data.menuId
        }
        console.log(data)
        
        saleHistorialContext.setFormData(data);
        
        
    });

    return (
        <div className={`${saleHistorialContext.isModalCreateOpen ? 'modal-create-container' : 'hidden'}`}>
            <div className='modal-create-card'>
                <div className='modal-create-options'>
                    <h2>Nuevo Registro de Ventas</h2>
                </div>
                <div>
                    <form className="create-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}



                        <label htmlFor="week" className='register-product-name'>
                            Semana
                        </label>
                        <input
                            type="week"
                            className="cost-input"
                            {...register("week",{
                                required:{
                                    value:true,
                                    message:"Semana Requerida"
                                }
                            })}
                        />
                        {
                            errors.week?.message && <span className="error">{errors.week?.message}</span>
                        }


                        <div className="save-cost-container">
                            <button className="save-cost" type="submit">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}





export { ModalCreateCost, ModalCreateSale, ModalCreateRecordCosts, ModalCreateRecordSales };