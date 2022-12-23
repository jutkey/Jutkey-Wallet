<script setup lang="ts">
// import { ref, reactive } from 'vue';
import DialogDefault from '../DialogDefault.vue';

const emit = defineEmits(['close']);
defineProps({
  isDialog: {
    type: Boolean,
    default: () => false
  },
  width: {
    type: String,
    default: () => '50%'
  }
});
const handleDialogClose = () => {
  emit('close', false);
};
</script>
<template>
  <dialog-default
    :title="$t('about.privacy')"
    :is-dialog="isDialog"
    :is-footer="false"
    :width="width"
    @close="handleDialogClose"
  >
    <template #default>
      <el-scrollbar style="height: 50vh">
        <article class="px-5">
          <h3 class="text-first mb-2">COOKIES</h3>
          <p class="mb-2">
            You can set your browser to refuse all or some browser cookies, or
            to alert you when websites set or access cookies. If you disable or
            refuse cookies, please note that some parts of the Sites may become
            inaccessible or not function properly. For more information about
            the cookies we use, please see our Cookies Policy.
          </p>
          <p class="mb-3">
            Information we will never collect. We will never ask you to share
            your private keys or wallet seed. Never trust anyone or any site
            that asks you to enter your private keys or wallet seed.
          </p>
          <h3 class="text-first mb-2">USE OF PERSONAL INFORMATION</h3>
          <h4 class="text-first mb-2">To provide our service</h4>
          <p class="mb-2">
            We will use your personal information in the following ways:
          </p>
          <p class="mb-2">To enable you to access and use the Services.</p>
          <p class="mb-2">
            To provide and deliver products and services that you may request.
          </p>
          <p class="mb-2">
            To process and complete transactions, and send you related
            information, including purchase confirmations and invoices.
          </p>
          <p class="mb-3">
            To send information, including confirmations, technical notices,
            updates, security alerts, and support and administrative messages.
          </p>
          <h4 class="text-first mb-2">To comply with law</h4>
          <p class="mb-3">
            We use your personal information as we believe necessary or
            appropriate to comply with applicable laws (including anti-money
            laundering (AML) laws and know-your-customer (KYC) requirements),
            lawful requests and legal process, such as to respond to subpoenas
            or requests from government authorities.
          </p>
          <h4 class="text-first mb-2">To communicate with you</h4>
          <p class="mb-3">
            We use your personal information to communicate about promotions,
            upcoming events, and other news about products and services offered
            by us and our selected partners.
          </p>
          <h4 class="text-first mb-2">To optimize our platform</h4>
          <p class="mb-3">
            In order to optimize your user experience, we may use your personal
            information to operate, maintain, and improve our Services. We may
            also use your information to respond to your comments and questions
            regarding the Services, and to provide you and other users with
            general customer service.
          </p>
          <h4 class="text-first mb-2">With your consent</h4>
          <p class="mb-2">
            We may use or share your personal information with your consent,
            such as when you consent to let us post your testimonials or
            endorsements on our Sites, you instruct us to take a specific action
            with respect to your personal information, or you opt into third
            party marketing communications.
          </p>
          <p class="mb-3">
            For compliance, fraud prevention, and safety.We may use your
            personal information to protect, investigate, and deter against
            fraudulent, unauthorized, or illegal activity.
          </p>
          <h3 class="text-first mb-2">SHARING OF PERSONAL INFORMATION</h3>
          <p class="mb-2">
            We do not share the personal information that you provide us with
            other organizations without your express consent, except as
            described in this Privacy Policy. We disclose personal information
            to third parties under the following circumstances:
          </p>
          <p class="mb-2">
            Affiliates. We may disclose your personal information to our
            subsidiaries and corporate affiliates (i.e. our family of companies
            that are related by common ownership or control) for purposes
            consistent with this Privacy Policy.
          </p>
          <p class="mb-2">
            Business Transfers. We may share personal information when we do a
            business deal, or negotiate a business deal, involving the sale or
            transfer of all or a part of our business or assets. These deals can
            include any merger, financing, acquisition, or bankruptcy
            transaction or proceeding.
          </p>
          <p class="mb-2">
            Compliance with Laws and Law Enforcement; Protection and Safety.We
            may share personal information for legal, protection, and safety
            purposes.
          </p>
          <p class="mb-2">
            We may share information to comply with laws, including KYC and AML
            requirements.
          </p>
          <p class="mb-2">
            We may share information to protect the rights and property of the
            Company, our agents, customers, and others. This includes enforcing
            our agreements, policies, and terms of use.
          </p>
          <p class="mb-2">
            We may share information in an emergency. This includes protecting
            the safety of our employees and agents, our customers, or any
            person.
          </p>
          <p class="mb-2">
            Professional Advisors and Service Providers. We may share
            information with those who need it to do work for us. These
            recipients may include third party companies and individuals to
            administer and provide the Service on our behalf (such as bill and
            credit card payment processing, customer support, hosting, email
            delivery and database management services), as well as lawyers,
            bankers, auditors, and insurers.
          </p>
          <p class="mb-2">
            Other. You may permit us to share your personal information with
            other companies or entities of your choosing. Those uses will be
            subject to the privacy policies of the recipient entity or entities.
          </p>
          <p class="mb-3">
            We may also share aggregated and/or anonymized data with others for
            their own uses.
          </p>
          <h3 class="text-first mb-2">HOW INFORMATION IS SECURED</h3>
          <p class="mb-2">
            We retain information we collect as long as it is necessary and
            relevant to fulfill the purposes outlined in this privacy policy. In
            addition, we retain personal information to comply with applicable
            law where required, prevent fraud, resolve disputes, troubleshoot
            problems, assist with any investigation, enforce our Terms of Use,
            and other actions permitted by law. To determine the appropriate
            retention period for personal information, we consider the amount,
            nature, and sensitivity of the personal information, the potential
            risk of harm from unauthorized use or disclosure of your personal
            information, the purposes for which we process your personal
            information and whether we can achieve those purposes through other
            means, and the applicable legal requirements.
          </p>
          <p class="mb-2">
            In some circumstances we may anonymize your personal information (so
            that it can no longer be associated with you) in which case we may
            use this information indefinitely without further notice to you.
          </p>
          <p class="mb-3">
            We employ industry standard security measures designed to protect
            the security of all information submitted through the Services.
            However, the security of information transmitted through the
            internet can never be guaranteed. We are not responsible for any
            interception or interruption of any communications through the
            internet or for changes to or losses of data. Users of the Services
            are responsible for maintaining the security of any password,
            biometrics, user ID or other form of authentication involved in
            obtaining access to password protected or secure areas of any of our
            digital services. In order to protect you and your data, we may
            suspend your use of any of the Services, without notice, pending an
            investigation, if any breach of security is suspected.
          </p>
          <h3 class="text-first mb-2">ELIGIBILITY</h3>
          <p class="mb-3">
            If you are under the age of majority in your jurisdiction of
            residence, you may use the Services only with the consent of or
            under the supervision of your parent or legal guardian. Consistent
            with the requirements of the Children’s Online Privacy Protection
            Act (COPPA), if we learn that we have received any information
            directly from a child under age 13 without first receiving his or
            her parent’s verified consent, we will use that information only to
            respond directly to that child (or his or her parent or legal
            guardian) to inform the child that he or she cannot use the Sites
            and subsequently we will delete that information.
          </p>
          <h3 class="text-first mb-2">MARKETING COMMUNICATIONS AND SHARING</h3>
          <p class="mb-2">
            You may instruct us not to use your contact information to contact
            you regarding services, promotions, surveys and special events that
            might appeal to your interests by contacting us using the
            information below. You can also opt out by following the
            instructions located at the bottom of any commercial emails messages
            you may receive.
          </p>
          <p class="mb-2">
            Please note that, regardless of your request, we may still use and
            share certain information as permitted by applicable law. For
            example, you may not opt out of certain operational emails, such as
            those reflecting our relationship or transactions with you, or
            important notifications regarding the Services we are providing to
            you, such as service-related announcements (e.g., if our Services
            are temporarily suspended for maintenance).
          </p>
          <p class="mb-3">
            Or, if you have downloaded our mobile application and enabled push
            notifications on your mobile device, we may send you alerts and
            notifications through push notifications, for example, to
            communicate status updates on our Services. However, you may choose
            to disable these notifications (except for the initial notification
            intended to verify your identity).
          </p>
          <h3 class="text-first mb-2">THIRD PARTY LINKS AND WEBSITES</h3>
          <p class="mb-3">
            This Privacy Notice does not address, and we are not responsible
            for, the privacy practices of any third parties, including those
            that operate websites to which our Sites link. The inclusion of a
            link on our Sites does not imply that we or our affiliates endorse
            the practices of the linked website.
          </p>
          <h3 class="text-first mb-2">CO-BRANDED WEBSITES</h3>
          <p class="mb-3">
            In the event that our Sites link to other websites that include our
            branding, this Privacy Notice does not apply to those other
            websites. Visitors to those websites are advised to carefully read
            the notices on those individual websites.
          </p>
          <h3 class="text-first mb-2">CHANGES TO THIS PRIVACY POLICY</h3>
          <p class="mb-2">
            We may change this privacy policy at any time. We encourage you to
            periodically review this page for the latest information on our
            privacy practices. If we make any changes, we will change the Last
            Updated date above.
          </p>
          <p class="mb-3">
            Any modifications to this Privacy Policy will be effective upon our
            posting of the new terms and/or upon implementation of the changes
            to the Sites (or as otherwise indicated at the time of posting). In
            all cases, your continued use of the Sites or Services after the
            posting of any modified Privacy Policy indicates your acceptance of
            the terms of the modified Privacy Policy.
          </p>
        </article>
      </el-scrollbar>
    </template>
  </dialog-default>
</template>
