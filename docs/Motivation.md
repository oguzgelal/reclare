## Motivation

Early in the days of [front-end development](https://en.wikipedia.org/wiki/Front-end_web_development), people were building user interfaces with plain HTML and CSS, and manipulating the DOM with either vanilla javascript or with the all-famous jQuery. It was reasonable back then - as front-end applications were simple and not as data-driven. But the requirements grew over the years; front-end became responsible for more than just displaying the data that was handed over, it was given the responsibility of fetching and handling the data all by itself. Manipulating the DOM quickly lost its feasibility.

Modern front-end frameworks [solved this problem](https://medium.com/dailyjs/the-deepest-reason-why-modern-javascript-frameworks-exist-933b86ebc445) by abstracting away DOM manipulation. They handled it with data bindings or by virtualising the DOM; and with complimentary change detection mechanisms, they had the DOM reflect the underlying state of the application. These frameworks made it possible to build front-end applications without worrying about how DOM should be updated, but managing the state was still left on developers plate.

[Redux](https://redux.js.org) pioneered the way of standardizing [event-sourcing](https://martinfowler.com/eaaDev/EventSourcing.html) like transactional state management in front-end application development; with an immutable, read-only, single-source-of-truth style store. It restricted how and when the application state can update, which improved maintainabililty and robustness of applications as they scale. However, there are a few things where Redux falls short. [Reclare](https://github.com/reclarejs/reclare) is a Redux-inspired library that attempts to fill these gaps. 


#### Logic in State Management

Modern state management libraries focuses on one thing and one thing only, managing the application state; the logic behind the scenes is [usually overlooked](http://krasimirtsonev.com/blog/article/managing-state-in-javascript-with-state-machines-stent). It makes sense in the context of state management as it is today, because libraries tends to solve one problem at a time; however, **state management and business logic should not be seen as two different entities**. Granted there needs to be a separation between the two, as the impurities and effects of logic should be kept away from the management of the state. But they functionally belong to each other, so they should coexist and be operated under the same command channel. **This approach brings the same predictability to the logic that it does to the state**, making it easier to reason with, follow, understand and test the code. There was a need for a library that will dictate this lifecycle; handle logic and manage the state together but separately, maintaining all the best practices of state management that we've all seen by now. This is where Reclare steps in.


#### Code fragmentation

> There's no single clear answer to exactly what pieces of logic should go in a reducer or an action creator.

As mentioned in Redux documentation, there is no straight away answer to where business logic should reside within the application. But I believe there is more to the question of "where should it go". 

#### Declarativeness