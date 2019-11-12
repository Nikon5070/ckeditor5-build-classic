import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import { toWidget, toWidgetEditable } from '@ckeditor/ckeditor5-widget/src/utils';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';

// eslint-disable-next-line no-unused-vars
import InsertSummaryCommand from './summaryCommand';

export default class SummaryEditing extends Plugin {
	static get pluginName() {
		return 'SummaryEditing';
	}

	static get requires() {
		return [ Widget ];
	}

	init() {
		this._defineSchema();
		this._defineConverters();

		this.editor.commands.add( 'insertSummary', new InsertSummaryCommand( this.editor ) );
	}

	_defineSchema() {
		const schema = this.editor.model.schema;

		schema.register( 'summary', {
			isObject: true,
			allowWhere: '$block'
		} );

		schema.register( 'summaryTitle', {
			isLimit: true,
			allowIn: 'summary',
			allowContentOf: '$block'
		} );

		schema.register( 'summaryDescription', {
			isLimit: true,
			allowIn: 'summary',
			allowContentOf: '$root'
		} );

		schema.addChildCheck( ( context, childDefinition ) => {
			if ( context.endsWith( 'summaryDescription' ) && childDefinition.name == 'summary' ) {
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
			model: 'summary',
			view: {
				name: 'section',
				classes: 'summary'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'summary',
			view: {
				name: 'section',
				classes: 'summary'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'summary',
			view: ( modelElement, viewWriter ) => {
				const section = viewWriter.createContainerElement( 'section', { class: 'summary' } );
				return toWidget( section, viewWriter, { label: 'summary widget' } );
			}
		} );
	}

	addTitle( conversion ) {
		conversion.for( 'upcast' ).elementToElement( {
			model: 'summaryTitle',
			view: {
				name: 'h2',
				classes: 'summary-title'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'summaryTitle',
			view: {
				name: 'h2',
				classes: 'summary-title'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'summaryTitle',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createEditableElement( 'h2', { class: 'summary-title _editing' } );
				return toWidgetEditable( div, viewWriter );
			}
		} );
	}

	addDescription( conversion ) {
		conversion.for( 'upcast' ).elementToElement( {
			model: 'summaryDescription',
			view: {
				name: 'div',
				classes: 'summary-description'
			}
		} );

		conversion.for( 'dataDowncast' ).elementToElement( {
			model: 'summaryDescription',
			view: {
				name: 'div',
				classes: 'summary-description'
			}
		} );

		conversion.for( 'editingDowncast' ).elementToElement( {
			model: 'summaryDescription',
			view: ( modelElement, viewWriter ) => {
				const div = viewWriter.createEditableElement( 'div', { class: 'summary-description _editing' } );
				return toWidgetEditable( div, viewWriter );
			}
		} );
	}
}
