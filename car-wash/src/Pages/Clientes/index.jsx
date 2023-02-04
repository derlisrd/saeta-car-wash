import ClientesCreate from "./ClientesCreate";
import ClientesProvider from "./ClientesProvider";
import ListaClientes from "./ListaClientes";

function Clientes(){
    return(
        <ClientesProvider>
            <ClientesCreate />
            <ListaClientes />
        </ClientesProvider>
    )
}
export default Clientes;