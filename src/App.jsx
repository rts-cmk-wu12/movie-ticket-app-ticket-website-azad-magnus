import {useRoutes} from "react-router";
import routes from '~react-pages'

 const App = () => {
    return (
        <>
            {useRoutes(routes)}
        </>
    )
}

export default App;