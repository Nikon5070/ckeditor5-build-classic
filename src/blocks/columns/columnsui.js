import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// eslint-disable-next-line no-unused-vars
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// eslint-disable-next-line no-unused-vars
import quoteIcon from '@ckeditor/ckeditor5-core/theme/icons/quote.svg';
import './column.css';

export default class ColumnsUi extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		// eslint-disable-next-line no-unused-vars
		const t = editor.t;
		// eslint-disable-next-line no-undef
		console.log( 'columnsui' );

		// editor.ui.componentFactory.add( 'columns', locale => {
		// 	const command = editor.commands.get( 'columns' );
		// 	const buttonView = new ButtonView( locale );
		//
		// 	buttonView.set( {
		// 		label: t( 'Columns' ),
		// 		icon: quoteIcon,
		// 		tooltip: true,
		// 		isToggleable: true
		// 	} );
		//
		// 	// Bind button model to command.
		// 	buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );
		//
		// 	// Execute command.
		// 	this.listenTo( buttonView, 'execute', () => editor.execute( 'columns' ) );
		//
		// 	return buttonView;
		// } );
	}
}
