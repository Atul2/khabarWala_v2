import {createBrowserHistory} from "history";

const history = createBrowserHistory();

class Navigation {
    constructor() {
        history.listen(location => {
            //
        });
    }

    get history() {
        return history;
    }

}

export default new Navigation();