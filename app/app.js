import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';

import Gauge from './sandbox/gauge';
// import Proton from './sandbox/proton';

Ember.MODEL_FACTORY_INJECTIONS = true;

var App = Ember.Application.extend({
  modulePrefix: 'dashy', // TODO: loaded via config
  Resolver: Resolver
});

loadInitializers(App, 'dashy');

export default App;
