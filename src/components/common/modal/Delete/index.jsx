//import ReactDOM from "react-dom";
//import { XMarkIcon } from '@heroicons/react/24/solid';
import "./styles.css";
import {  useContext } from 'react';
import { CostsContext, CostsHistorialContext, SalesContext, SalesHistorialContext } from '../../../context';
import {useForm} from 'react-hook-form';


function ModalDeleteCost(data) {
    const { handleSubmit } = useForm();
    const context = useContext(CostsContext);

    
    const onSubmit = handleSubmit(async () => {
        try {
          const items = data.data.map(item => item);
    
          if (items.length > 0) {
            const deleteRequests = items.map(async (item) => {
              const response = await fetch(
                `http://localhost:3000/api/v1/costs/${item.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(item),
                }
              );
    
              if (!response.ok) {
                throw new Error(`Failed to delete cost with ID ${item.id}`);
              }
            });
    
            // Esperar a que todas las solicitudes de eliminación se completen antes de recargar la página
            await Promise.all(deleteRequests);
    
            alert("Gastos Borrados con éxito");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting cost", error);
        }
      });

    return (
        <div className={`${context.isModalDeleteOpen ? 'modal-delete-container' : 'hidden'}`}>
            <div className='modal-delete-card'>
                <div className='modal-delete-options'>
                    <h2>Eliminar gastos</h2>
                </div>
                <div>
                    <form className="delete-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}

    
                        <label htmlFor="product">
                           <span className="selection-title">
                                Gastos Seleccionados:
                            </span>
                            
                        </label>

                        <div className="selection-columns">
                            <ul className="selection-columns-item">
                                <li>
                                    Nombre
                                </li>
                            </ul> 

                            <ul className="selection-columns-item">
                                <li>
                                    #
                                </li>
                            </ul>

                            <ul className="selection-columns-date selection-columns-item">
                                <li>
                                    Fecha
                                </li>
                            </ul>

                            <ul className="selection-columns-item">
                                <li>
                                    Precio
                                    
                                </li>
                            </ul>
                        </div>
                            <div className="selection-container">
                                {data.data?.map((item) => (
                                    <span key={item.id} htmlFor={`product-${item.id}`} className="selection-items">
                                        <ul className="selection-item">
                                            <li>
                                                {item.product}
                                            </li>
                                        </ul>
                                       

                                       <ul className="selection-item">
                                            <li>
                                            {item.listnum}
                                            </li>
                                       </ul>

                                       <ul className="selection-item selection-item-date">
                                            <li>
                                                {`${item.year}-${item.month}-${item.day}`}
                                            </li>
                                       </ul>

                                       <ul className="selection-item">
                                            <li>
                                                {item.value}
                                            </li>
                                       </ul>
                                       
                                    </span>
                                ))}
                            </div>


    
                        <div className="delete-cost-container">
                            <button className="cancel-delete" onClick={()=>{
                                context.closeModal();
                                context.closeDeleteModal();
                                }}>Cancelar</button>
                            <button className="delete-cost" type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

function ModalDeleteSale(data) {
    const { handleSubmit } = useForm();
    const context = useContext(SalesContext);


    const onSubmit = handleSubmit(async () => {
        try {
          const items = data.data.map(item => item);
    
          if (items.length > 0) {
            const deleteRequests = items.map(async (item) => {
              const response = await fetch(
                `http://localhost:3000/api/v1/sales/${item.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(item),
                }
              );
    
              if (!response.ok) {
                throw new Error(`Failed to delete cost with ID ${item.id}`);
              }
            });
    
            // Esperar a que todas las solicitudes de eliminación se completen antes de recargar la página
            await Promise.all(deleteRequests);
    
            alert("Gastos Borrados con éxito");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting cost", error);
        }
      });

    return (
        <div className={`${context.isModalDeleteOpen ? 'modal-delete-container' : 'hidden'}`}>
            <div className='modal-delete-card'>
                <div className='modal-delete-options'>
                    <h2>Eliminar ventas</h2>
                </div>
                <div>
                    <form className="delete-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}

    
                        <label htmlFor="product">
                           <span className="selection-title">
                                Ventas Seleccionadas:
                            </span>
                            
                        </label>

                        <div className="selection-columns">
                            <ul className="selection-columns-item">
                                <li>
                                    Nombre
                                </li>
                            </ul> 

                            <ul className="selection-columns-item">
                                <li>
                                    #
                                </li>
                            </ul>

                            <ul className="selection-columns-date selection-columns-item">
                                <li>
                                    Fecha
                                </li>
                            </ul>

                            <ul className="selection-columns-item">
                                <li>
                                    Precio
                                    
                                </li>
                            </ul>
                        </div>
                            <div className="selection-container">
                                {data.data?.map((item) => (
                                    <span key={item.id} htmlFor={`product-${item.id}`} className="selection-items">
                                        <ul className="selection-item">
                                            <li>
                                               
                                                {item.menu.name}
                                            </li>
                                        </ul>
                                       

                                       <ul className="selection-item">
                                            <li>
                                            {item.listnum}
                                            </li>
                                       </ul>

                                       <ul className="selection-item selection-item-date">
                                            <li>
                                                {`${item.year}-${item.month}-${item.day}`}
                                            </li>
                                       </ul>

                                       <ul className="selection-item">
                                            <li>
                                                {item.menu.price}
                                            </li>
                                       </ul>
                                       
                                    </span>
                                ))}
                            </div>


    
                        <div className="delete-cost-container">
                            <button className="cancel-delete" onClick={()=>{
                                context.closeModal();
                                context.closeDeleteModal();
                                }}>Cancelar</button>
                            <button className="delete-cost" type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



function ModalDeleteRecordCost(data) {
    const { handleSubmit } = useForm();
    const context = useContext(CostsHistorialContext);



    
    const onSubmit = handleSubmit(async () => {
        try {
          const items = data.data.map(item => item);

          
          if (items.length > 0) {
            const deleteRequests = items.map(async (item) => {
              const costs = item.RecordedCosts.map(cost => cost);

              const response = await fetch(
                `http://localhost:3000/api/v1/record-costs/${item.id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(item),
                }
              );
      
              if (!response.ok) {
                throw new Error(`Failed to delete record with ID ${item.id}`);
              }
      
              // Eliminación de costos asociados al item actual
              if (costs.length > 0) {
                const deleteCostsRequest = costs.map(async (cost) => {
                  const costResponse = await fetch(
                    `http://localhost:3000/api/v1/costs/${cost.id}`,
                    {
                      method: "DELETE",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(cost),
                    }
                  );
      
                  // Manejar errores en la eliminación de costos
                  if (!costResponse.ok) {
                    throw new Error(`Failed to delete cost with ID ${cost.id}`);
                  }
                });
      
                // Esperar a que todas las solicitudes de eliminación de costos se completen
                await Promise.all(deleteCostsRequest);
              }
            });
      
            // Esperar a que todas las solicitudes de eliminación se completen antes de recargar la página
            await Promise.all(deleteRequests);
      
            alert("Gastos Borrados con éxito");
            window.location.reload();
          }
        } catch (error) {
          console.error("Error deleting cost", error);
        }
      });
      
      

    return (
        <div className={`${context.isModalDeleteOpen ? 'modal-delete-container' : 'hidden'}`}>
            <div className='modal-delete-card'>
                <div className='modal-delete-options'>
                    <h2>Eliminar Registro</h2>
                </div>
                <div>
                    <form className="delete-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}

    
                        <label htmlFor="product">
                           <span className="selection-title">
                                Registros Seleccionados:
                            </span>
                            
                        </label>

                        <div className="selection-columns">
                            <ul className="selection-columns-item">
                                <li>
                                    Semana
                                </li>
                            </ul> 

                            <ul className="selection-columns-item">
                                <li>
                                    #
                                </li>
                            </ul>

                            <ul className="selection-columns-date selection-columns-item">
                                <li>
                                    Fecha
                                </li>
                            </ul>

                            <ul className="selection-columns-item">
                                <li>
                                    Total
                                    
                                </li>
                            </ul>
                        </div>
                            <div className="selection-container">
                                {data.data?.map((item) => (
                                    <span key={item.id} htmlFor={`product-${item.id}`} className="selection-items">
                                        <ul className="selection-item">
                                            <li>
                                                
                                                {item.week}
                                            </li>
                                        </ul>
                                       

                                       <ul className="selection-item">
                                            <li>
                                            {item.listnum}
                                            </li>
                                       </ul>

                                       <ul className="selection-item selection-item-date">
                                            <li>
                                                {item.createdAt}
                                            </li>
                                       </ul>

                                       <ul className="selection-item">
                                            <li>
                                                {item.totalPrice}
                                            </li>
                                       </ul>
                                       
                                    </span>
                                ))}
                            </div>


    
                        <div className="delete-cost-container">
                            <button className="cancel-delete" onClick={()=>{
                                context.closeModal();
                                context.closeDeleteModal();
                                }}>Cancelar</button>
                            <button className="delete-cost" type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}



function ModalDeleteRecordSale(data) {
    const { handleSubmit } = useForm();
    const context = useContext(SalesHistorialContext);



    
    const onSubmit = handleSubmit(async () => {
        try {
            const items = data.data.map(item => item);
            if (items.length > 0) {
                const deleteRequests = items.map(async (item) => {
                    const sales = item.RecordedSales; // Corrección aquí

    
                    const response = await fetch(
                        `http://localhost:3000/api/v1/record-sales/${item.id}`,
                        {
                            method: "DELETE",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(item),
                        }
                    );
                    if (!response.ok) {
                        throw new Error(`Failed to delete record with ID ${item.id}`);
                    }
    
                    if (sales.length > 0) {
                        
                        const deleteSalesRequest = sales.map(async (sale) => {
                            const saleResponse = await fetch(
                                `http://localhost:3000/api/v1/sales/${sale.id}`, {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(sale),
                            }
                            );
    
                            if (!saleResponse.ok) {
                                throw new Error(`Failed to delete sale with ID ${sale.id}`);
                            }
                        });
    
                        await Promise.all(deleteSalesRequest);
                    }
                });
    
                await Promise.all(deleteRequests);
                alert("Registros Borrados con éxito");
                window.location.reload();
            }
        } catch (error) {
            console.error("Error deleting sales", error);
        }
    });
    
      

    return (
        <div className={`${context.isModalDeleteOpen ? 'modal-delete-container' : 'hidden'}`}>
            <div className='modal-delete-card'>
                <div className='modal-delete-options'>
                    <h2>Eliminar Registro</h2>
                </div>
                <div>
                    <form className="delete-cost-form" onSubmit={onSubmit}>
                        {/* Ingresar Datos del Producto*/}

    
                        <label htmlFor="product">
                           <span className="selection-title">
                                Registros Seleccionados:
                            </span>
                            
                        </label>

                        <div className="selection-columns">
                            <ul className="selection-columns-item">
                                <li>
                                    Semana
                                </li>
                            </ul> 

                            <ul className="selection-columns-item">
                                <li>
                                    #
                                </li>
                            </ul>

                            <ul className="selection-columns-date selection-columns-item">
                                <li>
                                    Fecha
                                </li>
                            </ul>

                            <ul className="selection-columns-item">
                                <li>
                                    Total
                                    
                                </li>
                            </ul>
                        </div>
                            <div className="selection-container">
                                {data.data?.map((item) => (
                                    <span key={item.id} htmlFor={`product-${item.id}`} className="selection-items">
                                        <ul className="selection-item">
                                            <li>
                                                
                                                {item.week}
                                            </li>
                                        </ul>
                                       

                                       <ul className="selection-item">
                                            <li>
                                            {item.listnum}
                                            </li>
                                       </ul>

                                       <ul className="selection-item selection-item-date">
                                            <li>
                                                {item.createdAt}
                                            </li>
                                       </ul>

                                       <ul className="selection-item">
                                            <li>
                                                {item.totalPrice}
                                            </li>
                                       </ul>
                                       
                                    </span>
                                ))}
                            </div>


    
                        <div className="delete-cost-container">
                            <button className="cancel-delete" onClick={()=>{
                                context.closeModal();
                                context.closeDeleteModal();
                                }}>Cancelar</button>
                            <button className="delete-cost" type="submit">Eliminar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}




export { ModalDeleteCost, ModalDeleteSale, ModalDeleteRecordCost, ModalDeleteRecordSale };