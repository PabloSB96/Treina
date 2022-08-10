package com.developm8.treina.trainer.clientdetail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.developm8.treina.R
import com.squareup.picasso.Picasso
import de.hdodenhof.circleimageview.CircleImageView

class FragmentTrainerClientDetailStats: Fragment() {

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View? {
        return inflater.inflate(R.layout.fragment_trainer_client_detail_stats, container, false)
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        //TODO
        val imageViewPhoto: CircleImageView = view.findViewById(R.id.imageViewPhoto)
        Picasso.get().load("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6JWHZWMtzht8O3XUO4ef9SjZoRzkPa4giOw&usqp=CAU")
            .fit().centerCrop().into(imageViewPhoto)
    }
}