import Command from '@ckeditor/ckeditor5-core/src/command';
// import first from '@ckeditor/ckeditor5-utils/src/first';

export default class InsertSimplyCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			this.editor.model.insertContent( createSimpleBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'simply' );

		this.isEnabled = allowedIn !== null;
	}
}

function createSimpleBox( writer ) {
	const simply = writer.createElement( 'simply' );
	const simplyTitle = writer.createElement( 'simplyTitle' );
	const simplyDescription = writer.createElement( 'simplyDescription' );

	writer.append( simplyTitle, simply );
	writer.append( simplyDescription, simply );
	writer.appendElement( 'paragraph', simplyDescription );

	return simply;
}
