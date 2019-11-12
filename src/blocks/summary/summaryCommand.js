import Command from '@ckeditor/ckeditor5-core/src/command';

export default class InsertSummaryCommand extends Command {
	execute() {
		this.editor.model.change( writer => {
			this.editor.model.insertContent( createSimpleBox( writer ) );
		} );
	}

	refresh() {
		const model = this.editor.model;
		const selection = model.document.selection;
		const allowedIn = model.schema.findAllowedParent( selection.getFirstPosition(), 'summary' );

		this.isEnabled = allowedIn !== null;
	}
}

function createSimpleBox( writer ) {
	const summary = writer.createElement( 'summary' );
	const summaryTitle = writer.createElement( 'summaryTitle' );
	const summaryDescription = writer.createElement( 'summaryDescription' );

	writer.append( summaryTitle, summary );
	writer.appendText( 'Заголовок', summaryTitle );
	writer.append( summaryDescription, summary );
	writer.appendText( 'Описание', summaryDescription );
	writer.appendElement( 'paragraph', summaryDescription );

	return summary;
}
