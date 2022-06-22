import { Route } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Navbar from "../../pages/navbar/navBar";
import Footer from "../../pages/footer/footer";

export const HomeTemplate = (props) => {
    return (
        <Route
            exact path={props.path}
            render={(propsRoute) => {
                return (
                    <Fragment>
                        <Navbar />
                        <props.component {...propsRoute} />
                        <Footer />
                    </Fragment>
                );
            }}
        />
    );
};
