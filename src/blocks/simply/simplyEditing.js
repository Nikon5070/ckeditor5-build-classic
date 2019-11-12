import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

// eslint-disable-next-line no-unused-vars
import InsertSimplyCommand from './simplyCommand';

export default class SimplyEditing extends Plugin {
	static get pluginName() {
		return 'SimplyEditing';
	}

	static get requires() {
		return [ Widget ];
	}

	init() {
		// eslint-disable-next-line no-undef
		console.log( 'SimplyEditing#init() got called' );

		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertSimply', new InsertSimplyCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'simply', {
			isObject: true,
			allowWhere: '$block'
		} );

		schema.register( 'simplyTitle', {
			isLimit: true,
			allowIn: 'simply',
			allowContentOf: '$block'
		} );

		schema.register( 'simplyDescription', {
			isLimit: true,
			allowIn: 'simply',
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'simplyDescription' ) && childDefinition.name == 'simply' ) {
				return false;
			}
		} );
	}

	_defineConverters() {
		const conversion = this.editor.conversion;
		this.addBlock( conversion );
		this.addTitle( conversion );
		this.addDescription( conversion );
	}

	addBlock( conversion ) {
		conversion.for( 'upcast' ).elementToElement( {
			model: 'simply',
			view: {
				name: 'section',
				classes: 'simply'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'simply',
			view: {
				name: 'section',
				classes: 'simply'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'simply',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement( 'section', { class: 'simply' } );

				return toWidget( section, viewWriter, { label: 'simply widget' } );
			}
		} );
	}

	addTitle( conversion ) {
		conversion.for( 'upcast' ).elementToElement( {
			model: 'simplyTitle',
			view: {
				name: 'div',
				classes: 'simply-title'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'simplyTitle',
			view: {
				name: 'div',
				classes: 'simply-title'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'simplyTitle',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'simply-title' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}

	addDescription( conversion ) {
		conversion.for( 'upcast' ).elementToElement( {
			model: 'simplyDescription',
			view: {
				name: 'div',
				classes: 'simply-description'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'simplyDescription',
			view: {
				name: 'div',
				classes: 'simply-description'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'simplyDescription',
			view: ( modelElement, viewWriter ) => {
				// Note: You use a more specialized createEditableElement() method here.
				const div = viewWriter.createEditableElement( 'div', { class: 'simply-description' } );

				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}
