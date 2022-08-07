import 'package:flutter/material.dart';
import 'package:flutter_stripe/flutter_stripe.dart';
import 'package:flutterstripeexample/home_screen.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  // set the publishable key for Stripe - this is mandatory
  WidgetsFlutterBinding.ensureInitialized();
  Stripe.publishableKey =
      "pk_test_51JeBHHSA5hpXD8WE2oUYMdLEwcDP7DCcLe6lnbEkaFWLcMbwTzNecrhKg8YeS6Z2ckRke1q9eGum0Mxqyo0D5LtS006Rp3hxHm";
  Stripe.merchantIdentifier = 'merchant.flutter.stripe.test';
  Stripe.urlScheme = 'flutterstripe';
  await Stripe.instance.applySettings();
  runApp(MyApp());
}

// payment_screen.dart
class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: HomeScreen(),
      // home: Scaffold(
      //   appBar: AppBar(),
      //   body: Column(
      //     children: [
      //       CardField(
      //         onCardChanged: (card) {
      //           print(card);
      //         },
      //       ),
      //       TextButton(
      //         onPressed: () async {
      //           // create payment method
      //           final paymentMethod = await Stripe.instance
      //               .createPaymentMethod(const PaymentMethodParams.card());
      //         },
      //         child: Text('pay'),
      //       )
      //     ],
      //   ),
      // ),
    );
  }
}
