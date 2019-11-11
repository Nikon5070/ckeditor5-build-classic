import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import ColumnsEditing from './columnsediting';
import ColumnsUi from './columnsui';

export default class Columns extends Plugin {
	static get requires() {
		return [ ColumnsEditing, ColumnsUi ];
	}

	static get pluginName() {
		return 'Columns';
	}
}
