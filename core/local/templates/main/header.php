<!doctype html>
<html lang="<?=LANGUAGE_ID?>">
<head>
    <title><?php $APPLICATION->ShowTitle()?></title>

    <?php $APPLICATION->ShowHead()?>
    <?php CJSCore::Init('jquery')?>
    <?php $APPLICATION->AddHeadScript(SITE_TEMPLATE_PATH.'/scripts.js')?>

</head>
<body class="page page_<?=LANGUAGE_ID?> page_<?$APPLICATION->ShowProperty('page_type', 'secondary')?>">
<?php $APPLICATION->ShowPanel()?>

<div class="page__top">
    <header class="header">
        <div class="header__inner">
            
        </div>
    </header>

    <main class="page__middle">
        <section class="page__content" style="background-image: url('<?$APPLICATION->ShowProperty('page_image')?>')">
            <?php if ($APPLICATION->GetCurPage(false) != SITE_DIR):?>
                <h1 class="page__title"><?php $APPLICATION->ShowTitle(false)?></h1>
            <?php endif;?>