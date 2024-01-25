import GUI from 'lil-gui';

// GUIController 클래스: lil-gui 라이브러리를 이용한 GUI 컨트롤러
export class GUIController {
	static _instance = null;
	_gui;
	_currentFolderName;

	constructor() {
		this._gui = new GUI();
	}

	static get instance() {
		if (!this._instance) {
			this._instance = new GUIController();
		}
		this._instance._currentFolderName = undefined;
		return this._instance;
	}

	_getGui = (folderName) => {
		let gui = this._gui;
		if (folderName) {
			gui = this._folder(folderName);
		} else if (this._currentFolderName) {
			gui = this._folder(this._currentFolderName);
		}
		return gui;
	}

	_folder = (title) => {
		let folder = this._gui.folders.find(f => f._title === title);
		if (!folder) folder = this._gui.addFolder(title);
		return folder;
	}

	_controller = (gui, name) => {
		return gui.controllers.find(c => c._name === name);
	}

	setFolder = (name) => {
		this._currentFolderName = name;
		return this;
	}

	open = (open) => {
		this._getGui(this._currentFolderName).open(open);
		return this;
	}

	addColor = (obj, propertyName, rgbScale, displayName, folderName) => {
		const controllerName = displayName || propertyName;
		const gui = this._getGui(folderName);

		let controller = this._controller(gui, controllerName);
		if (!controller) {
			controller = gui.addColor(obj, propertyName, rgbScale).name(controllerName);
		}
		return controller;
	}

	addNumericSlider = (obj, propertyName, min, max, step, displayName, folderName) => {
		const controllerName = displayName || propertyName;
		const gui = this._getGui(folderName);

		let controller = this._controller(gui, controllerName);
		if (!controller) {
			controller = gui.add(obj, propertyName, min, max, step).name(controllerName);
		}
		return controller;
	}

	addDropdown = (obj, propertyName, list, displayName, folderName) => {
		const controllerName = displayName || propertyName;
		const gui = this._getGui(folderName);

		let controller = this._controller(gui, controllerName);
		if (!controller) {
			controller = gui.add(obj, propertyName, list).name(controllerName);
		}
		return controller;
	}

	addButton = (obj, propertyName, displayName, folderName) => {
		const controllerName = displayName || propertyName;
		const gui = this._getGui(folderName);

		let controller = this._controller(gui, controllerName);
		if (!controller) {
			controller = gui.add(obj, propertyName).name(controllerName);
		}
		return controller;
	}

	addCheckBox = (obj, propertyName, displayName, folderName) => {
		const controllerName = displayName || propertyName;
		const gui = this._getGui(folderName);

		let controller = this._controller(gui, controllerName);
		if (!controller) {
			controller = gui.add(obj, propertyName).name(controllerName);
		}
		return controller;
	}
}
