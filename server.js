const path = require('path');
const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const uuid = require('./utils/uuid');
const auth = require('./utils/auth');