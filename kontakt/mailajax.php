<?php

    $errors = array();
    $form_data = array();
    function CheckEmail() {
        for($i = 0; $i < func_num_args(); $i++) {
            $addr = trim(func_get_arg($i));
            $parts = explode('@', $addr);

            if((!is_array($parts)) or (count($parts) != 2)) {
                return false;
            }
            if(!preg_match('/^[0-9a-z_]([-_.]?[0-9a-z])*$/i', $parts[0])) {
                return false;
            }
            if(is_numeric($parts[1])) {
                $parts[1] = long2ip($parts[1]);
            }
            if(preg_match('/^(\d+)\.(\d+)\.(\d+)\.(\d+)$/', $parts[1], $matches)) {
                foreach($matches as $part) {
                    if($part < 0 || $part > 255) {
                        return false;
                    }
                }
            }
            elseif(preg_match('/^([0-9a-z][-.0-9a-z]*\\.[a-z]{2,4}[.]?)$/i', $parts[1], $matches)) {
                $host = $matches[1];
                if(!getmxrr($host, $tmp_mx_hosts) or !checkdnsrr($host,'ANY')) {
                    return false;
                }
                // fix for verisign sitefinder
                if(gethostbyname($host) == '64.94.110.11') {
                    return false;
                }
            }
            else {
                return false;
            }
        }
        return true;
    }
if($_POST) {
    $botmail = htmlentities($_POST['email']);
    if($botmail) {
        sleep(9999999);
        return false;
    }
    $mail = CheckEmail($_POST['xyz']);
    if(!$mail) {
        $errors['name'] = "eMail Adresse ungültig!";
        $errors['badmail'] = true;
    }
    $postName = htmlentities($_POST['name']);
    $postMsg = htmlentities($_POST['msg']);
    $postMail = htmlentities($_POST['xyz']);
    if (empty($postName)) {
        $errors['name'] = "Ich brauch deinen Namen!"; 
        $errors['badname'] = true;
    }
    if (empty($postMsg)) {
        $errors['name'] = "Kontaktanfrage ohne Nachricht?!"; 
        $errors['badmsg'] = true;
    }
    if (empty($postMail)) {
        $errors['name'] = "Ich brauche deine eMail um dir zu antworten!"; 
        $errors['badmail'] = true;
    }
    if(!empty($errors)) {
        $form_data['success'] = false;
        $form_data['errors']  = $errors;
    } else {
        $form_data['name']  = $postName;
        $form_data['success'] = true;
        $form_data['xyz']  = $postMail;
        $form_data['msg']  = $postMsg;

        $q = "mail@glossboss.de";
        $bq = $postName;
        $d = $postMsg;
        $e = $postMail;
        $be ="Kontaktanfrage Website";
        $header = "From:" .$bq. " <" .$e.">\n";     
        $header .= "Reply-To: ".$e."\n"; 
        $header .= 'MIME-Version: 1.0' . "\r\n"; 
        $header .= 'Content-type: text/html; charset=utf-8' . "\r\n";
        $me = "Name: $bq \n";
        $me .= "Nachricht: $d";
        $me = nl2br($me);
        $ms = mail($q, $be, $me, $header);
        if(!$ms) {
            $form_data['phpmail_bad'] = true;
        }
    }
    echo json_encode($form_data);
    
}
?>