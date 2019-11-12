import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
// eslint-disable-next-line no-unused-vars
import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';

// eslint-disable-next-line no-unused-vars
import quoteIcon from '@ckeditor/ckeditor5-core/theme/icons/quote.svg';
import './simply.css';

export default class SimplyUi extends Plugin {
	/**
	 * @inheritDoc
	 */
	init() {
		const editor = this.editor;
		// eslint-disable-next-line no-unused-vars
		const t = editor.t;

		editor.ui.componentFactory.add( 'simply', locale => {
			// The state of the button will be bound to the widget command.
			const command = editor.commands.get( 'insertSimply' );

			// The button will be an instance of ButtonView.
			const buttonView = new ButtonView( locale );

			buttonView.set( {
				// The t() function helps localize the editor. All strings enclosed in t() can be
				// translated and change when the language of the editor changes.
				label: t( 'Simply' ),
				withText: true,
				tooltip: true
			} );

			// Bind the state of the button to the command.
			buttonView.bind( 'isOn', 'isEnabled' ).to( command, 'value', 'isEnabled' );

			// Execute the command when the button is clicked (executed).
			this.listenTo( buttonView, 'execute', () => editor.execute( 'insertSimply' ) );

			return buttonView;
		} );
	}
}
