<?php

namespace app\controllers;

use app\models\Page;
use Yii;
use yii\web\Controller;
use yii\web\Response;

class PageController extends Controller {
    public function actionWriting() {
        return $this->render('writing');
    }

    public function actionSave() {
        $request = Yii::$app->request;
        $data = $request->post();
        
        $page = new Page();

        $page->title = $data['title'];
        $page->content = $data['content'];
        $page->save();

        Yii::$app->response->format = Response::FORMAT_JSON;
        return $page->getAttributes();
    }

    public function actionShow() {
        $request = Yii::$app->request;
        $id = $request->get('id');

        $page = Page::findOne($id);

        return $this->render('page', ['title' => $page->title, 'content' => json_decode($page->content)]);
    }

    public function actionRemove() {
        $request = Yii::$app->request;

        $id = $request->get('id');

        $page = Page::findOne($id);

        $page->delete();

        Yii::$app->response->format = Response::FORMAT_JSON;
        return $page->getAttributes();
    }
}