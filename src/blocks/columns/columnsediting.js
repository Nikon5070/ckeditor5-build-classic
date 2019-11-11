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

		schema.register( 'column', {
			// Behaves like a self-contained object (e.g. an image).
			isObject: true,

			// Allow in places where other blocks are allowed (e.g. directly in the root).
			allowWhere: '$block'
		} );

		schema.register( 'columnTitle', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'column',

			// Allow content which is allowed in blocks (i.e. text with attributes).
			allowContentOf: '$block'
		} );

		schema.register( 'columnDescription', {
			// Cannot be split or left by the caret.
			isLimit: true,

			allowIn: 'column',

			// Allow content which is allowed in the root (e.g. paragraphs).
			allowContentOf: '$root'
		} );

		// ADDED
		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'columnDescription' ) && childDefinition.name == 'columns' ) {
				return false;
			}
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

		conversion.for( 'upcast' ).elementToElement( {
			model: 'columnTitle',
			view: {
				name: 'div',
				classes: 'column-title'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'columnTitle',
			view: {
				name: 'div',
				classes: 'column-title'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'columnTitle',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'column-title' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );

		conversion.for( 'upcast' ).elementToElement( {
			model: 'columnDescription',
			view: {
				name: 'div',
				classes: 'column-description'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'columnDescription',
			view: {
				name: 'div',
				classes: 'column-description'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'columnDescription',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'column-description' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}
