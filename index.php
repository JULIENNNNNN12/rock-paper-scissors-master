<?php

$donnees_brutes = <<<'EOD'
codsal	futur_codsal	nomsal	nomjnf	prenom	fonction	code_division	code_branche	etablis	societe	statut	localisation_geo	autoritesignature	groupe	type_acces	login	login_TP	mdp	servicePersonnel	delegation	visuPlanning	Couhor	Objpro	Codres	Categ_Vente	Numsal_Paye	Point_Transfert	Point_CtrlHor	Point_TypeHoraire	Point_Cadre	Point_Selection	Point_TypeFG	Date_Arrivee	Assist_CEP	Date_Sortie	valorisation	WF_sign	carte_grise	marque_vehicule	lib_puissance_fiscale	forfaitjour
AAC	NKH	ACHARYA	NULL	ANUPAM	TEN	L	P	C	C	A	MRS       	FHA	39	S	tp\aacharya	tp\aacharya	NULL	N	NULL	NULL	0	0	CDR	CDR	NULL	N	N	1	N	N	FG	NULL	N	NULL	P	TT	NULL	NULL	NULL	N
AAS	NULL	ASTEGGIANO		ALEXIA	INGENIEUR QUALITE	S	O	C	C	I	MRS       	CAN	11	D	CYBERNETIX_MARS\AASTEGGIANO	TP\AASTEGGIANO	NULL	N	NULL	NULL	0	NULL	PA      	PA	1017	W	O	1	O	O	FG	2014-03-17 00:00:00	N	2014-12-16 00:00:00	R	T	NULL	NULL	NULL	N
ABA	ABA	BANDIERA		Angelo	INGENIEUR EN MECANIQUE	T	O	C	C	I	MRS       	STA	33	D	CYBERNETIX_MARS\ABANDIERA	TP\ABANDIERA	angelo	N	NULL	NULL	42,33	90	INP     	INP	264	W	O	1	O	O	FG	NULL	N	NULL	P	T	NULL	NULL	NULL	N
ABAC	NULL	BACQUEVILLE		ALEX	Stagiaire Ingénieur Projet	B	V	C	C	I	MRS       	GJA	11	B	CYBERNETIX_MARS\abacqueville	TP\abacqueville	NULL	N	NULL	NULL	0	NULL	STG     	STG		W	O	11	N	O	FG	2024-02-05 00:00:00	N	2024-07-31 00:00:00	P	T	NULL	NULL	NULL	N
ABAF	NULL	BAFOULOULOU		AISSA	responsable BE Soft	M	S	C	C	A	MRS       	SDEC	11	B	CYBERNETIX_MARS\abafouloulou	TP\abafouloulou	NULL	N	NULL	NULL	0	NULL	PA      	PA		N	N	0	N	O	FG	2023-09-01 00:00:00	N	NULL	R	BRW	NULL	NULL	NULL	N
ABE	ABE	BEDOTTO		ALAIN	RESPONSABLE LOGISTIQUE	B	Z	C	C	I	MRS       	JSCU	79	S	CYBERNETIX_MARS\ABEDOTTO	TP\ABEDOTTO	manon	N	NULL	NULL	42,64	0	PA      	PA	433	W	O	1	N	O	FG	NULL	N	NULL	R	2QTBW	NULL	NULL	NULL	N
ABEA	NULL	BEAUBEAU		AURELIEN	ACHETEUR PRESTA	B	A	C	C	A	MRS       	MLA	72	S	CYBERNETIX_MARS\abeaubeau1	TP\abeaubeau1	aurelien	N	NULL	NULL	0	0	PA	PA	NULL	N	O	1	N	O	FG	2022-01-03 00:00:00	N	NULL	P	THT	NULL	NULL	NULL	N
ABI	NULL	BINET	CLERGUE	ANNE	ACHETEUR	B	A	C	C	I	MRS       	MLA	76	S	CYBERNETIX_MARS\ANBINET	TP\ANBINET	treille	N	NULL	NULL	37,31	NULL	HA      	HA	777	W	O	4	N	O	FG	NULL	N	NULL	P	THB	NULL	NULL	NULL	N
ABO	NULL	BOISNEL		AURELIE	INGENIEUR EN MECANIQUE        	O	D	C	C	I	MRS       	ST	11	D	CYBERNETIX_MARS\ABO	TP\ABO	PouPaPou	N	NULL	NULL	28,04	NULL	IAT     	IAT	805	W	O	1	N	O	FG	NULL	N	2007-12-31 00:00:00	P	T	NULL	NULL	NULL	N
ABOU	NULL	BOUHNIDE		AMINE	Stagiaire Ingénieur Mécanique	R	Z	P	C	I	CPG       	RAB	11	B	CYBERNETIX_MARS\abouhnide	TP\abouhnide	NULL	N	NULL	NULL	0	NULL	STG     	STG		W	O	9	N	O	FG	2024-09-02 00:00:00	N	NULL	P	TT	NULL	NULL	NULL	N
ABR	NULL	BRUNIN		ARNAUD	INGENIEUR GENERALISTE	B	P	C	C	A	MRS       	GJA	11	B	CYBERNETIX_MARS\ABRUNIN	TP\ABRUNIN	abrunin	N	NULL	NULL	20,33	NULL	CPS     	CPS	1033	W	O	1	N	O	FG	2015-01-05 00:00:00	N	NULL	P	TTB	NULL	NULL	NULL	N
ABX	NULL	BAILLEUX		ANTHONY	INGENIEUR GENERALISTE	T	R	C	C	A	MRS       	CVI	11	B	CYBERNETIX_MARS\ABAILLEUX	TP\ABAILLEUX	hockeysub77%	N	NULL	NULL	28,57	NULL	INP     	INP	904	W	O	1	O	O	FG	2010-09-13 00:00:00	N	NULL	P	TT	NULL	NULL	NULL	N
ACAS	ACA	CASTEX		ANDRE	EXPERT TECHNIQUE	L	P	C	C	I	MRS       	FLF	20	S	CYBERNETIX_MARS\ACASTEX	TP\ACASTEX	2409	N		NULL	41,53	70	DIR     	DIR	746	W	O	4	O	O	FG	NULL	N	NULL	P	TBW	NULL	NULL	NULL	N
EOD;

$donnees_brutes = str_replace("NULL", "", $donnees_brutes);

// Traitement des données
    $lignes = explode("\n", $donnees_brutes);
    $en_tetes = explode("\t", $lignes[0]);
    
    function formatDate($date) {
        if (empty($date) || strtoupper($date) == 'NULL') return '';
        return substr($date, 0, 10);
    }
    
    $salaries = [];
    for ($i = 1; $i < count($lignes); $i++) {
        if (!empty(trim($lignes[$i]))) {
            $salarie = explode("\t", $lignes[$i]);
            $donnees_salarie = [];
            for ($j = 0; $j < count($en_tetes); $j++) {
                $cle = $en_tetes[$j];
                $valeur = isset($salarie[$j]) ? $salarie[$j] : '';
                $donnees_salarie[$cle] = (strpos($cle, 'Date_') === 0) ? formatDate($valeur) : $valeur;
            }
            $salaries[] = $donnees_salarie;
        }
    }
    
    $titre = 'Liste des Salariés';
    ?>
    
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <title><?= htmlspecialchars($titre) ?></title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
        <style>
            body { background: #f5f5f5; font-family: Arial; margin: 20px; }
            h1 { text-align: center; color: #2c3e50; }
            .container { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { padding: 10px; font-size: 0.9em; border-bottom: 1px solid #ddd; }
            th { background-color: #2c3e50; color: white; position: sticky; top: 0; }
            tr:nth-child(even) { background: #f9f9f9; }
            tr:hover { background: #e6f7ff; cursor: pointer; }
            .search-box { margin: 20px 0; max-width: 300px; }
            .search-box input { width: 100%; padding: 10px; border-radius: 5px; border: 1px solid #ccc; }
        </style>
    </head>
    <body>
    
    <h1><?= htmlspecialchars($titre) ?></h1>
    
    <div class="search-box">
        <input type="text" id="searchInput" placeholder="Rechercher un salarié...">
    </div>
    
    <div class="container">
        <table id="salariesTable">
            <thead>
                <tr>
                    <th>#</th>
                    <?php foreach ($en_tetes as $en_tete): ?>
                        <th><?= htmlspecialchars($en_tete) ?></th>
                    <?php endforeach; ?>
                </tr>
            </thead>
            <tbody>
                <?php foreach ($salaries as $index => $salarie): ?>
                <tr data-index="<?= $index ?>">
                    <td><?= $index + 1 ?></td>
                    <?php foreach ($en_tetes as $col): ?>
                        <td><?= htmlspecialchars($salarie[$col]) ?></td>
                    <?php endforeach; ?>
                </tr>
                <?php endforeach; ?>
            </tbody>
        </table>
    </div>
    
    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Modifier un salarié</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>
                </div>
                <div class="modal-body">
                    <form id="editForm" class="row g-3"></form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
                    <button type="submit" class="btn btn-primary" form="editForm">Enregistrer</button>
                </div>
            </div>
        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script>
    const headers = <?= json_encode($en_tetes) ?>;
    const table = document.getElementById('salariesTable');
    const rows = table.querySelectorAll('tbody tr');
    const editForm = document.getElementById('editForm');
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    
    document.getElementById('searchInput').addEventListener('keyup', function () {
        const input = this.value.toLowerCase();
        rows.forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(input) ? '' : 'none';
        });
    });
    
    rows.forEach(row => {
        row.addEventListener('click', () => {
            const cells = row.querySelectorAll('td');
            const data = {};
            headers.forEach((header, index) => {
                data[header] = cells[index + 1]?.innerText.trim();
            });

            for (const key in data) {
                const value = data[key];
                let inputField = '';

                if (key === 'statut') {
                    inputField = `
            <select class="form-select" name="${key}" id="${key}">
                <option value="">-- Choisir --</option>
                <option value="A" ${value === 'A' ? 'selected' : ''}>A</option>
                <option value="I" ${value === 'I' ? 'selected' : ''}>I</option>
            </select>
        `;
                } else {
                    inputField = `
            <input type="text" class="form-control" name="${key}" id="${key}" value="${value}">
        `;
                }

                editForm.insertAdjacentHTML('beforeend', `
        <div class="col-md-4">
            <label for="${key}" class="form-label">${key}</label>
            ${inputField}
        </div>
    `);
            }

            editForm.dataset.rowIndex = row.dataset.index;
            editModal.show();
        });
    });
    
    editForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(editForm);
        const values = Object.fromEntries(formData.entries());
        const rowIndex = editForm.dataset.rowIndex;
        const targetRow = document.querySelector(`tr[data-index="${rowIndex}"]`);
        if (!targetRow) return;
    
        headers.forEach((key, idx) => {
            targetRow.children[idx + 1].textContent = values[key] || '';
        });
    
        editModal.hide();
    });
    </script>
    
    </body>
    </html>
