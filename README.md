# University of Southampton Skydive Club - Codebase
This repository hosts the codebase for the University of Southampton Website and any additional, future, applications.

## Website
[Website link](http://localhost:3000 "UoS Skydive Website")

An SPA implemented using a MERN stack.

Members of the University of Southampton Skydive club can create their own account on the site that enables them to keep track of their skydiving progression, manage bookings for the club's rigs (parachutes) and organise transport to and from the dropzone.

Complete list of planned / implemented [x] / ~~scrapped~~ functionality:

* [ ] Users
	* [ ] Basic user login
	* [ ] Login using Facebook
	* [ ] Committee positions
	* [ ] Privileges (admin, committee, *Kit manager* etc.)
* [ ] Rigs
	* [x] Basic rig viewing
	* [ ] Rig booking system
	* [ ] Ability to set the rigs as **offline** for maintenance etc.
	* [ ] Email notifications for bookings + kit manager
* [ ] Lift sharing
	* [ ] Car owners can offer lifts
	* [ ] Users requiring lifts can join an offer
	* [ ] Facebook messenger integration?
* [ ] Weather forecasts
* [ ] Additional dropzone information
* [ ] Training method info
* [ ] Events page
* [ ] Photo gallery


### Frontend

A React project managed using Webpack and Babel.

```bash
cd website/client
npm install
npm start
```

### Backend

A Node.js base utilising the Express framework to provide a REST API for the frontend. Data is stored in a MongoDB database, hosted by [mLab](https://mlab.com "mLab").

```bash
cd website/server
npm install
nodemon app.js

```
