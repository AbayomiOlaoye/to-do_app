import './styles/main.scss';
import Recorder from './modules/taskify.js'

// Get array and populate DOM
document.addEventListener('DOMContentLoaded', Recorder.checkStorage);