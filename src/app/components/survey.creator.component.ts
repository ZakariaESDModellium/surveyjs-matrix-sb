import * as SurveyCreator from 'survey-creator';
import * as SurveyKo from 'survey-knockout';
import * as widgets from 'surveyjs-widgets';
import { init as initCustomWidget } from './customwidget';
import { Component, EventEmitter, Input, Output } from '@angular/core';

widgets.icheck(SurveyKo);
widgets.select2(SurveyKo);
widgets.inputmask(SurveyKo);
widgets.jquerybarrating(SurveyKo);
widgets.jqueryuidatepicker(SurveyKo);
widgets.nouislider(SurveyKo);
widgets.select2tagbox(SurveyKo);
//widgets.signaturepad(SurveyKo);
widgets.sortablejs(SurveyKo);
widgets.ckeditor(SurveyKo);
widgets.autocomplete(SurveyKo);
widgets.bootstrapslider(SurveyKo);
//widgets.emotionsratings(SurveyKo);
initCustomWidget(SurveyKo);

SurveyCreator.StylesManager.applyTheme("modern");

// var CkEditor_ModalEditor = {
//   afterRender: function(modalEditor, htmlElement) {
//     var editor = window["CKEDITOR"].replace(htmlElement);
//     editor.on("change", function() {
//       modalEditor.editingValue = editor.getData();
//     });
//     editor.setData(modalEditor.editingValue);
//   },
//   destroy: function(modalEditor, htmlElement) {
//     var instance = window["CKEDITOR"].instances[htmlElement.id];
//     if (instance) {
//       instance.removeAllListeners();
//       window["CKEDITOR"].remove(instance);
//     }
//   }
// };
// SurveyCreator.SurveyPropertyModalEditor.registerCustomWidget(
//   "html",
//   CkEditor_ModalEditor
// );
// CKEditor is the third party library
/* Steps to use CKEditor in the project:
    1. run 'npm i ckeditor'
    2. update the "build" section of the angular.json: add ckeditor.js script in the scripts section.
*/

@Component({
  selector: "survey-creator",
  template: `
    <div id="surveyCreatorContainer"></div>
  `
})
export class SurveyCreatorComponent {
  surveyCreator: SurveyCreator.SurveyCreator;
  @Input() json: any;
  @Output() surveySaved: EventEmitter<Object> = new EventEmitter();
  ngOnInit() {
    SurveyKo.JsonObject.metaData.addProperty(
      "questionbase",
      "popupdescription:text"
    );
    SurveyKo.JsonObject.metaData.addProperty("page", "popupdescription:text");

    let options = {
       showEmbededSurveyTab: true, 
      showPropertyGrid: false,
      showTranslationTab: true,
      showElementEditorAsPropertyGrid: false,
      showDefaultLanguageInTestSurveyTab: false,
      showInvisibleElementsInTestSurveyTab: false,
      showSimulatorInTestSurveyTab: false,
      isAutoSave: true,
      scrollToNewElement: false
     };
    this.surveyCreator = new SurveyCreator.SurveyCreator(
      "surveyCreatorContainer",
      options
    );
    this.surveyCreator.text = JSON.stringify(this.json);
    this.surveyCreator.saveSurveyFunc = this.saveMySurvey;
  }

  saveMySurvey = () => {
    console.log(JSON.stringify(this.surveyCreator.text));
    this.surveySaved.emit(JSON.parse(this.surveyCreator.text));
  };
}
