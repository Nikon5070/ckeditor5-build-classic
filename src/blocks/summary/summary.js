import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import SummaryEditing from './summaryEditing';
import SummaryUi from './summaryUi';

export default class Summary extends Plugin {
	static get requires() {
		return [ SummaryEditing, SummaryUi ];
	}

	static get pluginName() {
		return 'Summary';
	}
}
