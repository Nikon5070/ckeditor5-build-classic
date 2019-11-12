import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SimplyEditing from './simplyEditing';
import SimplyUi from './simplyUi';

export default class Simply extends Plugin {
	static get requires() {
		return [ SimplyEditing, SimplyUi ];
	}

	static get pluginName() {
		return 'Simply';
	}
}
