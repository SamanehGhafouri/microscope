import './header.html';
import '../../templates/application/layout.js';

//A Better header
//show the reactivity whenever we vote or post new that post jump up and down in real time
Template.header.helpers({
    activeRouteClass: function () {

        let args = Array.prototype.slice.call(arguments, 0);
        args.pop();

        let active = _.any(args, function (name) {
            return Router.current() && Router.current().route.getName() === name

        });

        return active && 'active';

    }
})