import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

import InsertColumnsCommand from './columnscommand';

export default class ColumnsEditing extends Plugin {
	static get pluginName() {
		return 'ColumnsEditing';
	}

	static get requires() {
		return [ Widget ];
	}

	init() {
		// eslint-disable-next-line no-undef
		console.log( 'ColumnsEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertColumns', new InsertColumnsCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'columns', {
			isObject: true,
			allowWhere: '$block'
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;

		conversion.for( 'upcast' ).elementToElement( {
			model: 'column',
			view: {
				name: 'section',
				classes: 'column'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'column',
			view: {
				name: 'section',
				classes: 'column'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'column',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement( 'section', { class: 'column' } );

				return toWidget( section, viewWriter, { label: 'simple column widget' } );
			}
		} );
	}
}
