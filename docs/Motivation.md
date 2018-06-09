## Motivation

Early in the days of front-end development, people were building user interfaces with plain HTML and CSS, and manipulating the DOM with either vanilla javascript or with the all-famous jQuery. It was reasonable back then - as front-end applications were simple and not as data-driven. But the requirements grew over the years; front-end became responsible for more than just displaying the data that was handed over, it was given the responsibility of fetching and handling the data all by itself. This approach quickly lost its feasibility.

Modern front-end frameworks solved this problem by abstracting away DOM manipulation. They handled it with data bindings or by virtualising the DOM; and with complimentary change detection mechanisms, they had the DOM reflect the underlying state of the application. These frameworks made it possible to build front-end applications without worrying about how DOM should be updated, but managing the state was still left to developers. 

[Redux](https://redux.js.org) pioneered the way of standardizing [event-sourcing](https://martinfowler.com/eaaDev/EventSourcing.html)-like transactional state management in a immutable, read-only, single-source-of-truth style store. [Many](https://github.com/ngrx/platform) [state](https://github.com/vuejs/vuex)-[management](https://github.com/vesparny/statty) [libraries](https://github.com/jamiebuilds/unstated) [followed](https://github.com/Lucifier129/relite) [similar](https://github.com/tictail/tide) [patterns](https://github.com/adobe/twist). It restricted how and when the application state can update, which made bugs visible and reproducible regardless of the complexity of the application. As powerful as Redux is, there are parts where it falls short. And among all the things where Redux falls short, one stands out, [Where should my “business logic” go?](https://redux.js.org/faq/code-structure#structure-business-logic). 

> There's no single clear answer to exactly what pieces of logic should go in a reducer or an action creator.

As mentioned in Redux documentation, there is no straight away answer to where business logic should reside within the application. But I believe there is more to the question of "where should it go". 

[Here](http://krasimirtsonev.com/blog/article/managing-state-in-javascript-with-state-machines-stent)
