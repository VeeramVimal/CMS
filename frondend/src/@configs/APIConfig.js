import axios from 'axios';

export const APP_HOST = process.env.REACT_APP_HOST || 'localhost'
export const APP_PORT = process.env.REACT_APP_PORT || 8000
export const HOST = `${APP_HOST}:${APP_PORT}`

export const API_URL = `http://${HOST}/vr`
export const API_URL_BASE = `http://${HOST}`

export const IMAGE_URL_BASE = `http://${HOST}/images`