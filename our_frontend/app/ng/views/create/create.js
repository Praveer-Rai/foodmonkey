/**
 * Created by Florian Noack on 26.06.2016.
 */

'use strict';

angular.module('myApp.create')

    .constant('createState', {
        name: 'create.view',
        options: {

            // Using an empty url means that this child state will become active
            // when its parent's url is navigated to. Urls of child states are
            // automatically appended to the urls of their parent. So this state's
            // url is '/create' (because '/create' + '').
            url: '',

            // IMPORTANT: Now we have a state that is not a top level state. Its
            // template will be inserted into the ui-view within this state's
            // parent's template; so the ui-view within contacts.html. This is the
            // most important thing to remember about templates.
            views: {
                'content@root': {
                    templateUrl: 'views/create/create.html',
                }
            }

        }

    });
